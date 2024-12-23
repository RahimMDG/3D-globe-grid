import { useState, useRef, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
// import { useControls } from "leva";
import { GridTexture } from "./GridTexture";
import { ImageUploadForm } from "./ImageUploadForm";
import { Stars } from "./Stars";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Button } from "./ui/button";
import CustomOrbitControls from "./customOrbitControl";
import { ScrollArea } from "./ui/scroll-area";
import { NavLink } from "react-router";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

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
  onHover: (pixel: PixelData | null, event?: THREE.Intersection) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pixels = useQuery(api.pixels.getPixels);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredPixel, setHoveredPixel] = useState<PixelData | null>(null);

  useEffect(() => {
    if (meshRef.current) {
      // Set a random initial y-axis rotation
      meshRef.current.rotation.y = Math.random() * Math.PI * 2;
    }
  }, []);

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
      onHover(pixel, event);
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
      onDoubleClick={handleClick}
    >
      <sphereGeometry args={[1, 100, 100]} />
      <meshStandardMaterial map={texture} toneMapped={true} />
    </mesh>
  );
}

export default function Sphere() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [hoveredPixel, setHoveredPixel] = useState<PixelData | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // const { gridSize } = useControls({
  //   gridSize: { value: 100, min: 100, max: 1000, step: 10 },
  // });

  const gridSize = 1000;
  

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

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleHover = (pixel: PixelData | null) => {
    setHoveredPixel(pixel);
  };

  const handleLinkClick = () => {
    if (hoveredPixel && hoveredPixel.websiteUrl) {
      window.open(hoveredPixel.websiteUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`flex h-screen relative bg-neutral-900 font-sans w-full overflow-hidden ${hoveredPixel && "cursor-pointer"}`}
      onDoubleClick={handleLinkClick}
    >
      <nav className="z-10 fixed top-0 left-0 flex w-full justify-between p-4">
        <div className="pl-4">
          <NavLink to="/" end>
            <p className="text-neutral-300 inline-block mr-4 font-semibold">
              Home
            </p>
          </NavLink>
          <NavLink to="/about">
            <p className="text-neutral-300 inline-block font-semibold">About</p>
          </NavLink>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="bg-neutral-300">Purchase slot</Button>
          </SheetTrigger>
          <SheetContent className="bg-neutral-900 text-neutral-200">
            <div className="mx-auto w-full pt-6 h-full">
              <ScrollArea className="h-full pt-6 w-full">
                <ImageUploadForm
                  onImageUpload={handleImageUpload}
                  gridSize={gridSize}
                />
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
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
              onHover={handleHover}
            />
          )}
          <CustomOrbitControls />
        </Canvas>
        {hoveredPixel && (
          <div
            className="fixed z-20 p-2 bg-neutral-800 text-neutral-200 rounded pointer-events-auto cursor-pointer"
            style={{
              position: "fixed",
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: "translate(-50%, -120%)",
            }}
            onClick={handleLinkClick}
          >
            {hoveredPixel.websiteUrl}
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
