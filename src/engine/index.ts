import * as THREE from "three";
import Lenis from "lenis";
import { createMoon } from "./moon";
import { createPhysics, type PhysicsSystem } from "./physics";
import { createStarfield, type StarfieldSystem } from "./starfield";
import { evaluateMoonTrajectory } from "./trajectory";

const MAX_PIXEL_RATIO = 2;

const INTRO_DELAY = 750;
const INTRO_DURATION = 1000;
const INTRO_MIN_FRAMES = 60;

const GLASS_OPACITY_MARGIN = 20;

const SCROLL_LERP_FACTOR = 0.2;

const INTRO_CAMERA_POSITION = new THREE.Vector3(0, 0, 16);
const INTRO_LOOK_START = new THREE.Vector3(0, 6, 0);
const INTRO_LOOK_END = new THREE.Vector3(0, 0, 0);

const INTRO_MOON_POSITION = new THREE.Vector3(0, -17.5, -6);
const INTRO_MOON_SCALE = 12;

export interface SceneAPI {
  destroy: () => void;
  getScrollProgress: () => number;
  lenis: Lenis;
}

export function initEngine(canvas: HTMLCanvasElement): SceneAPI {
  const startTime = performance.now();
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });

  const canvasRect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);

  renderer.setPixelRatio(dpr);
  renderer.setSize(canvasRect.width, canvasRect.height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030410, 0.003);

  const moon = createMoon(scene);
  moon.setPositionAndScale(INTRO_MOON_POSITION, INTRO_MOON_SCALE);

  const camera = new THREE.PerspectiveCamera(
    30,
    canvasRect.width / canvasRect.height,
    0.01,
    600,
  );
  camera.position.copy(INTRO_CAMERA_POSITION);
  camera.lookAt(INTRO_LOOK_START);

  const sun = new THREE.DirectionalLight(0xefefff, 2.5);
  sun.position.set(0, 0, 10);
  scene.add(sun);

  const fillTop = new THREE.HemisphereLight(0x3545b0, 0x080414, 0.6);

  fillTop.up.set(0, 1, 0);

  const fillBottom = new THREE.HemisphereLight(0x080414, 0x3545b0, 0.6);

  fillBottom.up.set(0, -1, 0);

  scene.add(fillTop, fillBottom);

  const starfield: StarfieldSystem = createStarfield(
    scene,
    renderer.getPixelRatio(),
  );

  const physics: PhysicsSystem = createPhysics();

  const glassElements = [...document.querySelectorAll<HTMLElement>(".reveal")];

  let scrollProgress = 0;
  let destroyed = false;
  let animFrameId: number | null = null;
  let frames = 0;
  let introStartTime: number | null = null;

  const clock = new THREE.Clock(false);
  const previousOverflow = document.body.style.overflow;

  const lenis = new Lenis({
    lerp: SCROLL_LERP_FACTOR,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 0.6,
    touchMultiplier: 1,
    anchors: {
      duration: 1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    },
  });

  // let last_frames = 0;
  // setInterval(() => {
  //   console.log("fps:", frames - last_frames);
  //   last_frames = frames;
  // }, 1000);

  const updateGlassOpacity = () => {
    const viewportHeight = window.innerHeight;
    const margin = viewportHeight * (GLASS_OPACITY_MARGIN / 100);

    for (const element of glassElements) {
      const rect = element.getBoundingClientRect();

      let opacity = 1;

      if (rect.bottom <= margin) {
        opacity = Math.max(0, rect.bottom / margin);
      } else if (rect.top >= viewportHeight - margin) {
        opacity = Math.max(0, (viewportHeight - rect.top) / margin);
      }

      element.style.opacity = (Math.round(opacity * 100) / 100).toString();
    }
  };

  const lockScroll = () => {
    document.body.style.overflow = "hidden";
    lenis.stop();
  };

  const unlockScroll = () => {
    document.body.style.overflow = previousOverflow;
    lenis.start();
  };

  let viewportWidth = canvasRect.width;

  const onResize = () => {
    const rect = canvas.getBoundingClientRect();

    if (rect.width === viewportWidth) return;

    viewportWidth = rect.width;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);

    renderer.setPixelRatio(dpr);
    renderer.setSize(rect.width, rect.height, false);

    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();

    starfield.updatePixelRatio(dpr);
  };

  window.addEventListener("resize", onResize);

  function updateScene(dt: number, updatePhysics = true): void {
    scrollProgress = lenis.progress;

    const trajectory = evaluateMoonTrajectory(scrollProgress);
    moon.setPositionAndScale(trajectory.pos, trajectory.scale);

    if (updatePhysics) {
      const phys = physics.update(dt, prefersReducedMotion);
      moon.setRotation(phys.moonRotX, phys.moonRotY);
      starfield.points.rotation.x = phys.starRotX;
      starfield.points.rotation.y = phys.starRotY;
    }

    starfield.followCamera(camera.position);
  }

  const lookAtTarget = new THREE.Vector3();

  function introAnimation(time: number): void {
    const elapsed = time - startTime;
    frames++;

    if (elapsed < INTRO_DELAY || frames < INTRO_MIN_FRAMES) {
      return;
    }

    if (introStartTime === null) {
      introStartTime = time;
      clock.start();
    }

    const introElapsed = time - introStartTime;
    const rawProgress = Math.min(introElapsed / INTRO_DURATION, 1);
    const progress = 1 - Math.pow(1 - rawProgress, 3);

    lookAtTarget.lerpVectors(INTRO_LOOK_START, INTRO_LOOK_END, progress);
    camera.lookAt(lookAtTarget);

    const dt = clock.getDelta();
    updateScene(dt, false);

    if (rawProgress >= 1) {
      camera.lookAt(INTRO_LOOK_END);
      unlockScroll();
      currentAnimation = normalAnimation;
    }
  }

  function normalAnimation(time: number): void {
    frames++;
    lenis.raf(time);
    const dt = clock.getDelta();
    updateScene(dt);
  }

  let currentAnimation: (time: number) => void = introAnimation;

  function tick(time: number): void {
    if (destroyed) return;

    animFrameId = requestAnimationFrame(tick);

    currentAnimation(time);
    updateGlassOpacity();
    renderer.render(scene, camera);
    moon.uploadNextSegment(renderer);
  }

  lockScroll();
  animFrameId = requestAnimationFrame(tick);

  return {
    destroy: () => {
      destroyed = true;

      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
      }

      window.removeEventListener("resize", onResize);

      unlockScroll();
      lenis.destroy();
      physics.destroy();
      renderer.dispose();
    },

    getScrollProgress: () => scrollProgress,
    lenis,
  };
}
