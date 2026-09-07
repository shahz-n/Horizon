/* =========================================================================
   Engine Orchestrator — Entry Point for 3D Starfield & Moon Simulation
   ========================================================================= */
import * as THREE from "three";
import { createStarfield, type StarfieldSystem } from "./starfield";
import { createMoon, type MoonSystem } from "./moon";
import { getScrollProgress, evaluateMoonTrajectory } from "./trajectory";
import { createPhysics, type PhysicsSystem } from "./physics";

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export interface SceneAPI {
  destroy: () => void;
  getScrollProgress: () => number;
}

export function initEngine(canvas: HTMLCanvasElement): SceneAPI {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* Renderer setup */
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  /* Scene & Camera setup */
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030410, 0.003);

  const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.001,
    600,
  );
  camera.position.set(0, 0, 16);

  /* Lighting */
  const sun = new THREE.DirectionalLight(0xefefff, 2.5);
  sun.position.set(0, 0, 10);
  scene.add(sun);

  const fill = new THREE.HemisphereLight(0x3545b0, 0x080414, 0.6);
  scene.add(fill);

  /* Engine Subsystems */
  const starfield: StarfieldSystem = createStarfield(
    scene,
    renderer.getPixelRatio(),
  );
  const moon: MoonSystem = createMoon(scene);
  const physics: PhysicsSystem = createPhysics();

  // Load Moon texture slices progressively via worker threads
  moon.loadSlices();

  /* Scroll Sync State */
  let scrollProgress = 0;
  let targetScrollProgress = 0;

  /* Resize listener */
  const onResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    starfield.updatePixelRatio(dpr);
  };

  window.addEventListener("resize", onResize);

  /* Main Render Loop */
  const clock = new THREE.Clock();
  let animFrameId: number;
  let destroyed = false;

  function animate() {
    if (destroyed) return;
    animFrameId = requestAnimationFrame(animate);
    const dt = clock.getDelta();

    // Responsive scroll lerp mapping
    targetScrollProgress = getScrollProgress();
    scrollProgress = lerp(
      scrollProgress,
      targetScrollProgress,
      prefersReducedMotion ? 1 : 0.22,
    );

    // Evaluate 3D Spline Path & Scale
    const trajectory = evaluateMoonTrajectory(scrollProgress);
    moon.setPositionAndScale(trajectory.pos, trajectory.scale);

    // Update Physics (Mouse Damping & Rotations)
    const phys = physics.update(dt, prefersReducedMotion);
    moon.setRotation(phys.moonRotX, phys.moonRotY);

    starfield.points.rotation.x = phys.starRotX;
    starfield.points.rotation.y = phys.starRotY;

    // Keep starfield centered on camera
    starfield.followCamera(camera.position);

    renderer.render(scene, camera);
  }
  animate();

  return {
    destroy: () => {
      destroyed = true;
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", onResize);
      physics.destroy();
      renderer.dispose();
    },
    getScrollProgress: () => scrollProgress,
  };
}

// Alias export for backward compatibility
export const initScene = initEngine;
