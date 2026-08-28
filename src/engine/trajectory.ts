/* =========================================================================
   Engine Module — 3D Spline Path & Scale Trajectory Evaluator
   ========================================================================= */
import * as THREE from "three";

const MOON_PATH_POINTS = [
  new THREE.Vector3(0.0, -70, -50.0), // 0.00: Hero (surface view right under content)
  new THREE.Vector3(0.0, -20.0, -30.0), // 0.20: About (ascending toward center)
  new THREE.Vector3(0.0, 0.0, -50.0), // 0.40: Experience (centered in viewport ~50% page height)
  new THREE.Vector3(0.0, -0.0, -50.0), // 0.60: Skills (gently floating center-right)
  new THREE.Vector3(0.0, 10.0, -30.0), // 0.80: Projects (gently floating center-left)
  new THREE.Vector3(0.0, 70, -50.0), // 1.00: Contact (descending into surface view)
];

const moonSplineCurve = new THREE.CatmullRomCurve3(
  MOON_PATH_POINTS,
  false,
  "centripetal",
  0.5,
);

interface ScaleKeyframe {
  p: number;
  scale: number;
}

const SCALE_KEYFRAMES: ScaleKeyframe[] = [
  { p: 0.0, scale: 12.0 },
  { p: 0.2, scale: 2.2 },
  { p: 0.4, scale: 1.45 },
  { p: 0.6, scale: 1.55 },
  { p: 0.8, scale: 1.55 },
  { p: 1.0, scale: 12.0 },
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function evalMoonScale(progress: number): number {
  const kfs = SCALE_KEYFRAMES;
  let a = kfs[0],
    b = kfs[kfs.length - 1];
  for (let i = 0; i < kfs.length - 1; i++) {
    if (progress >= kfs[i].p && progress <= kfs[i + 1].p) {
      a = kfs[i];
      b = kfs[i + 1];
      break;
    }
  }
  const span = Math.max(b.p - a.p, 0.0001);
  const t = smoothstep(THREE.MathUtils.clamp((progress - a.p) / span, 0, 1));
  return lerp(a.scale, b.scale, t);
}

export function getScrollProgress(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return THREE.MathUtils.clamp(window.scrollY / max, 0, 1);
}

export interface TrajectoryResult {
  pos: THREE.Vector3;
  scale: number;
}

export function evaluateMoonTrajectory(
  scrollProgress: number,
): TrajectoryResult {
  const pos = moonSplineCurve.getPoint(scrollProgress);
  const scale = evalMoonScale(scrollProgress);
  return { pos, scale };
}
