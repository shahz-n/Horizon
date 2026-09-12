import * as THREE from "three";
import Lenis from "lenis";
import { createMoon } from "./moon";
import { createPhysics, type PhysicsSystem } from "./physics";
import { createStarfield, type StarfieldSystem } from "./starfield";
import { evaluateMoonTrajectory, getScrollProgress } from "./trajectory";

const MAX_PIXEL_RATIO = 2;
const SCROLL_LERP_FACTOR = 1.0;

const INTRO_DELAY = 900;
const INTRO_DURATION = 1000;

const INTRO_CAMERA_POSITION = new THREE.Vector3(0, 0, 16);
const INTRO_LOOK_START = new THREE.Vector3(0, 6, 0);
const INTRO_LOOK_END = new THREE.Vector3(0, 0, 0);

const INTRO_MOON_POSITION = new THREE.Vector3(0, -17.5, -6);
const INTRO_MOON_SCALE = 12;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

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

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO),
  );
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030410, 0.003);

  const moon = createMoon(scene);
  moon.setPositionAndScale(INTRO_MOON_POSITION, INTRO_MOON_SCALE);

  const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.001,
    600,
  );
  camera.position.copy(INTRO_CAMERA_POSITION);
  camera.lookAt(INTRO_LOOK_START);

  const sun = new THREE.DirectionalLight(0xefefff, 2.5);
  sun.position.set(0, 0, 10);
  scene.add(sun);

  const fill = new THREE.HemisphereLight(0x3545b0, 0x080414, 0.6);
  scene.add(fill);

  const starfield: StarfieldSystem = createStarfield(
    scene,
    renderer.getPixelRatio(),
  );

  const physics: PhysicsSystem = createPhysics();

  let scrollProgress = 0;
  let targetScrollProgress = 0;

  let destroyed = false;
  let animFrameId: number | null = null;

  const clock = new THREE.Clock(false);
  const previousOverflow = document.body.style.overflow;

  const lenis = new Lenis({
    lerp: prefersReducedMotion ? 1 : 0.1,
    smoothWheel: !prefersReducedMotion,
    syncTouch: false,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.0,
  });

  const lockScroll = () => {
    document.body.style.overflow = "hidden";
    lenis.stop();
  };

  const unlockScroll = () => {
    document.body.style.overflow = previousOverflow;
    lenis.start();
  };

  const onResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);

    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    starfield.updatePixelRatio(dpr);
  };

  window.addEventListener("resize", onResize);

  function updateScene(dt: number, updatePhysics = true): void {
    targetScrollProgress = getScrollProgress();

    const dt60 = Math.min(dt, 0.1) * 60;
    const lerpFactor = prefersReducedMotion
      ? 1
      : 1 - Math.pow(1 - SCROLL_LERP_FACTOR, dt60);

    scrollProgress = lerp(scrollProgress, targetScrollProgress, lerpFactor);

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

    if (elapsed < INTRO_DELAY) {
      updateScene(0, false);
      return;
    }

    if (!clock.running) {
      clock.start();
    }

    const introElapsed = elapsed - INTRO_DELAY;
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
    lenis.raf(time);
    const dt = clock.getDelta();
    updateScene(dt);
  }

  let currentAnimation: (time: number) => void = introAnimation;

  function tick(time: number): void {
    if (destroyed) return;
    animFrameId = requestAnimationFrame(tick);

    currentAnimation(time);
    moon.uploadNextSegment(renderer);
    renderer.render(scene, camera);
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
