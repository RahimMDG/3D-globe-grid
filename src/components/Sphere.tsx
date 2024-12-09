import { useState, useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";
import { GridTexture } from "./GridTexture";
import { ImageUploadForm } from "./ImageUploadForm";
import { Stars } from "./Stars";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "./ui/button";
import CustomOrbitControls from "./customOrbitControl";
import { ScrollArea } from "./ui/scroll-area";

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
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredPixel, setHoveredPixel] = useState<PixelData | null>(null);

  useFrame(() => {
    if (meshRef.current && !isHovering) {
      meshRef.current.rotation.y += 0.0005;
    }
  });

  const handlePointerMove = (event: THREE.Intersection) => {
    if (!pixels) return;

    const uv = event.uv;
    if (!uv) return;

    // Adjust calculations to match the grid texture generation
    const x = Math.floor(uv.x * gridSize);
    const y = Math.floor((1 - uv.y) * gridSize); // Invert y-axis

    const pixel = pixels.find(
      (p) => x >= p.x && x < p.x + p.width && y >= p.y && y < p.y + p.height
    );

    if (pixel) {
      setIsHovering(true);
      setHoveredPixel(pixel);
      onHover(pixel);
    } else {
      setIsHovering(false);
      setHoveredPixel(null);
      onHover(null);
    }
  };

  const handleClick = () => {
    if (hoveredPixel && hoveredPixel.websiteUrl) {
      window.open(hoveredPixel.websiteUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <mesh
      ref={meshRef}
      onPointerMove={(e) => handlePointerMove(e.intersections[0])}
      onPointerOut={() => {
        setIsHovering(false);
        setHoveredPixel(null);
        onHover(null);
      }}
      onClick={handleClick}
    >
      <sphereGeometry args={[1, 100, 100]} />
      <meshStandardMaterial map={texture} toneMapped={true} />
    </mesh>
  );
}
export default function Sphere() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [hoveredPixel, setHoveredPixel] = useState<PixelData | null>(null);

  const { gridSize } = useControls({
    gridSize: { value: 100, min: 100, max: 500, step: 10 },
  });

  const handleTextureCreated = useCallback((newTexture: THREE.Texture) => {
    // Ensure vibrant colors for the texture
    newTexture.colorSpace = THREE.SRGBColorSpace;
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
    <div className="flex h-screen relative bg-neutral-900 font-sans w-full overflow-hidden">
      <div className="z-10 right-2 bottom-8 absolute p-4 m-2 rounded-md border border-neutral-800 bg-neutral-900">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Purchase slot</Button>
          </DrawerTrigger>
          <DrawerContent className="h-4/5 bg-neutral-800 text-white">
            <div className="mx-auto w-full lg:w-3/5 h-full">
              <ScrollArea className="h-full w-full p-8">
                <ImageUploadForm
                  onImageUpload={handleImageUpload}
                  gridSize={gridSize}
                />
              </ScrollArea>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [0, 0, 1.4], near: 0.0001 }}
          gl={{
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
        >
          <ambientLight intensity={3.06} />
          <Stars />
          {texture && (
            <SphereObject
              texture={texture}
              gridSize={gridSize}
              onHover={setHoveredPixel}
            />
          )}
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
