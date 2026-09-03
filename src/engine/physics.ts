/* =========================================================================
   Engine Module — Mouse Traversal & Smooth Damped Physics (Zero Overshoot)
   ========================================================================= */
import * as THREE from "three";

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export interface PhysicsState {
  moonRotX: number;
  moonRotY: number;
  starRotX: number;
  starRotY: number;
}

export interface PhysicsSystem {
  update: (dt: number, prefersReducedMotion: boolean) => PhysicsState;
  destroy: () => void;
}

export function createPhysics(): PhysicsSystem {
  let mouseX = 0,
    mouseY = 0;
  let moonBaseRotY = 6;
  let currentMoonRotX = 0.0,
    currentMoonRotY = 0.5;
  let currentStarRotX = 0,
    currentStarRotY = 0;

  const onMouseMove = (e: MouseEvent) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  };

  window.addEventListener("mousemove", onMouseMove, { passive: true });

  return {
    update: (dt: number, prefersReducedMotion: boolean) => {
      if (!prefersReducedMotion) {
        moonBaseRotY += dt * 0.012;

        const targetMoonX = mouseY * 0.125;
        const targetMoonY = mouseX * 0.125;

        const targetStarX = -mouseY * 0.125;
        const targetStarY = mouseX * 0.125;

        currentMoonRotX = lerp(currentMoonRotX, targetMoonX, 0.03);
        currentMoonRotY = lerp(currentMoonRotY, targetMoonY, 0.03);

        currentStarRotX = lerp(currentStarRotX, targetStarX, 0.02);
        currentStarRotY = lerp(currentStarRotY, targetStarY, 0.02);
      }

      return {
        moonRotX: currentMoonRotX,
        moonRotY: moonBaseRotY + currentMoonRotY,
        starRotX: currentStarRotX,
        starRotY: currentStarRotY,
      };
    },
    destroy: () => {
      window.removeEventListener("mousemove", onMouseMove);
    },
  };
}
