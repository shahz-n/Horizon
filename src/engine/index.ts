import * as THREE from "three";
import { createMoon } from "./moon";
import { createPhysics, type PhysicsSystem } from "./physics";
import { createStarfield, type StarfieldSystem } from "./starfield";
import { evaluateMoonTrajectory, getScrollProgress } from "./trajectory";

const MAX_PIXEL_RATIO = 2;
const SCROLL_LERP_FACTOR = 0.22;

const INTRO_DELAY = 500;
const INTRO_DURATION = 1000;

const INTRO_CAMERA_POSITION = new THREE.Vector3(0, 0, 16);
const INTRO_LOOK_START = new THREE.Vector3(4, 6, 4);
const INTRO_LOOK_END = new THREE.Vector3(0, 0, 0);

const INTRO_MOON_POSITION = new THREE.Vector3(0, -17.5, -6);
const INTRO_MOON_SCALE = 12;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export interface SceneAPI {
  destroy: () => void;
  getScrollProgress: () => number;
}

export async function initEngine(canvas: HTMLCanvasElement): Promise<SceneAPI> {
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

  const moon = createMoon(scene);

  scene.fog = new THREE.FogExp2(0x030410, 0.003);

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

  moon.setPositionAndScale(INTRO_MOON_POSITION, INTRO_MOON_SCALE);

  let scrollProgress = 0;
  let targetScrollProgress = 0;

  let destroyed = false;
  let animFrameId: number | null = null;

  const clock = new THREE.Clock();

  const previousOverflow = document.body.style.overflow;

  const lockScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const unlockScroll = () => {
    document.body.style.overflow = previousOverflow;
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

  function updateScene(dt: number): void {
    targetScrollProgress = getScrollProgress();

    scrollProgress = lerp(
      scrollProgress,
      targetScrollProgress,
      prefersReducedMotion ? 1 : SCROLL_LERP_FACTOR,
    );

    const trajectory = evaluateMoonTrajectory(scrollProgress);

    moon.setPositionAndScale(trajectory.pos, trajectory.scale);

    const phys = physics.update(dt, prefersReducedMotion);

    moon.setRotation(phys.moonRotX, phys.moonRotY);

    starfield.points.rotation.x = phys.starRotX;
    starfield.points.rotation.y = phys.starRotY;

    starfield.followCamera(camera.position);
  }

  async function normalAnimate(): Promise<void> {
    if (destroyed) return;
    moon.uploadNextSegment(renderer);
    animFrameId = requestAnimationFrame(normalAnimate);

    const dt = clock.getDelta();

    updateScene(dt);

    renderer.render(scene, camera);
  }

  async function introAnimate(startTime: number): Promise<void> {
    if (destroyed) return;

    animFrameId = requestAnimationFrame(() => {
      if (destroyed) return;

      moon.uploadNextSegment(renderer);

      const elapsed = performance.now() - startTime;

      if (elapsed < INTRO_DELAY) {
        renderer.render(scene, camera);
        introAnimate(startTime);
        return;
      }

      const introElapsed = elapsed - INTRO_DELAY;
      const rawProgress = Math.min(introElapsed / INTRO_DURATION, 1);
      const progress = 1 - Math.pow(1 - rawProgress, 3);

      const lookAtY = lerp(INTRO_LOOK_START.y, INTRO_LOOK_END.y, progress);

      camera.position.copy(INTRO_CAMERA_POSITION);
      camera.lookAt(0, lookAtY, 0);

      const dt = clock.getDelta();

      updateScene(dt);

      renderer.render(scene, camera);

      if (rawProgress < 1) {
        introAnimate(startTime);
        return;
      }

      camera.position.copy(INTRO_CAMERA_POSITION);
      camera.lookAt(INTRO_LOOK_END);

      unlockScroll();

      clock.start();
      normalAnimate();
    });
  }

  lockScroll();

  introAnimate(performance.now());
  console.log("intro end", performance.now());

  return {
    destroy: () => {
      destroyed = true;

      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
      }

      window.removeEventListener("resize", onResize);

      unlockScroll();

      physics.destroy();
      renderer.dispose();
    },

    getScrollProgress: () => scrollProgress,
  };
}
