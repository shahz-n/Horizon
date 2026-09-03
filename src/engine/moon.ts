/* =========================================================================
   Engine Module — Moon Mesh & DDS Compressed Texture Loader
   ========================================================================= */
import * as THREE from "three";

const MOON_RADIUS = 6;

export interface MoonSystem {
  mesh: THREE.Mesh;
  setPositionAndScale: (pos: THREE.Vector3, scale: number) => void;
  setRotation: (rotX: number, rotY: number) => void;
  loadTexture: (textureUrl: string) => void;
}

export function createMoon(scene: THREE.Scene): MoonSystem {
  const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 128, 128);

  const initialMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1.0,
    metalness: 0.0,
  });

  const moonMesh = new THREE.Mesh(moonGeometry, initialMaterial);
  moonMesh.position.set(0, -17.5, -6);
  moonMesh.scale.setScalar(12);
  scene.add(moonMesh);

  // const loader = new DDSLoader();
  const loader = new THREE.TextureLoader();

  return {
    mesh: moonMesh,
    setPositionAndScale: (pos: THREE.Vector3, scale: number) => {
      moonMesh.position.copy(pos);
      moonMesh.scale.setScalar(scale);
    },
    setRotation: (rotX: number, rotY: number) => {
      moonMesh.rotation.x = rotX;
      moonMesh.rotation.y = rotY;
    },
    loadTexture: (textureUrl: string) => {
      loader.load(
        textureUrl,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.needsUpdate = true;
          moonMesh.material.dispose();
          moonMesh.material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 1.0,
            metalness: 0.0,
          });
        },
        undefined,
        (err) => {
          console.warn("[moon] DDS texture failed to load:", err);
        },
      );
    },
  };
}
