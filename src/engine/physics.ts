import * as THREE from "three";

const ROTATION_SPEED = 0.015;
const MOUSE_ROTATION_LIMIT = 0.125;
const MOON_DAMPING = 0.03;
const STAR_DAMPING = 0.02;

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
  let moonBaseRotY = 0.0;
  let currentMoonRotX = 0.0,
    currentMoonRotY = 0.0;
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
        moonBaseRotY += dt * ROTATION_SPEED;

        const targetMoonX = mouseY * MOUSE_ROTATION_LIMIT;
        const targetMoonY = mouseX * MOUSE_ROTATION_LIMIT;

        const targetStarX = -mouseY * MOUSE_ROTATION_LIMIT;
        const targetStarY = mouseX * MOUSE_ROTATION_LIMIT;

        currentMoonRotX = lerp(currentMoonRotX, targetMoonX, MOON_DAMPING);
        currentMoonRotY = lerp(currentMoonRotY, targetMoonY, MOON_DAMPING);

        currentStarRotX = lerp(currentStarRotX, targetStarX, STAR_DAMPING);
        currentStarRotY = lerp(currentStarRotY, targetStarY, STAR_DAMPING);
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
