import { useState, useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Sparkles } from '@react-three/drei'
import * as THREE from "three";
import { useControls } from "leva";
import { GridTexture } from "./GridTexture";
import { ImageUploadForm } from "./ImageUploadForm";
import { Stars } from "./Stars";
import { api } from "../../convex/_generated/api";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { SignInFormPassword } from "./SignInFormPassword";
import CustomOrbitControls from "./customOrbitControl";

interface PixelData {
  websiteUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

function SphereObject({
  texture,
  gridSize,
  onHover,
}: {
  texture: THREE.Texture;
  gridSize: number;
  onHover: (pixel: PixelData | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pixels = useQuery(api.pixels.getPixels);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
    }
  });

  const handlePointerMove = (event: THREE.Intersection) => {
    if (!pixels) return;

    const uv = event.uv;
    if (!uv) return;

    const x = Math.floor(uv.x * gridSize);
    const y = Math.floor(uv.y * gridSize);

    const pixel = pixels.find(
      (p) => x >= p.x && x <= p.x + p.width && y >= p.y && y <= p.y + p.height
    );

    onHover(pixel || null);
  };

  return (
    <mesh
      ref={meshRef}
      onPointerMove={(e) => handlePointerMove(e.intersections[0])}
      onPointerOut={() => onHover(null)}
    >
      <sphereGeometry args={[1, 100, 100]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function Sphere() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [hoveredPixel, setHoveredPixel] = useState<PixelData | null>(null);

  const { gridSize } = useControls({
    gridSize: { value: 1000, min: 100, max: 1000, step: 10 },
  });

  const handleTextureCreated = useCallback((newTexture: THREE.Texture) => {
    setTexture(newTexture);
  }, []);

  const handleImageUpload = (
    image: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    if (texture) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = texture.image.width;
        canvas.height = texture.image.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(texture.image, 0, 0);
          const cellSize = canvas.width / gridSize;
          ctx.drawImage(
            img,
            x * cellSize,
            y * cellSize,
            width * cellSize,
            height * cellSize
          );
          texture.image = canvas;
          texture.needsUpdate = true;
        }
      };
      img.src = image;
    }
  };

  return (
    <div className="flex h-screen relative bg-neutral-600 font-sans w-full overflow-hidden">
      <Authenticated>
        <div className="w-1/5 z-10 right-2 bottom-2 absolute p-4 m-2 rounded-md bg-neutral-900 text-white">
          <h2 className="text-2xl font-bold mb-4">Buy Pixels</h2>
          <ImageUploadForm
            onImageUpload={handleImageUpload}
            gridSize={gridSize}
          />
        </div>
      </Authenticated>
      <Unauthenticated>
        <div className="p-4 w-full absolute">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Sign In</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <SignInFormPassword />
            </DialogContent>
          </Dialog>
        </div>
      </Unauthenticated>
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 0, 3], near: 0.0001 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Stars />
          {texture && (
            <SphereObject
              texture={texture}
              gridSize={gridSize}
              onHover={setHoveredPixel}
            />
          )}
          {/* <Sparkles count={200} scale={6} size={2} speed={0.4} /> */}
          <CustomOrbitControls />
        </Canvas>
        {hoveredPixel && (
          <div
            className="absolute p-2 bg-black/80 text-white rounded"
            style={{
              left: "50%",
              bottom: "20px",
              transform: "translateX(-50%)",
            }}
          >
            <a
              href={hoveredPixel.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Visit Website
            </a>
          </div>
        )}
      </div>
      <GridTexture
        resolution={4096}
        gridSize={gridSize}
        onTextureCreated={handleTextureCreated}
      />
    </div>
  );
}
