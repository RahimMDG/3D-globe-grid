import React, { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { PaymentForm } from "./PaymentForm";
import { ScrollArea } from "@radix-ui/react-scroll-area";
// import { cn } from "@/lib/utils";

interface CanvasImageUploadFormProps {
  onImageUpload: (
    image: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) => void;
  gridSize: number;
}

export function ImageUploadForm({
  onImageUpload,
  gridSize,
}: CanvasImageUploadFormProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [selectedCells, setSelectedCells] = useState<{x: number, y: number}[]>([]);
  const [url, setUrl] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [reservedPixelId, setReservedPixelId] = useState<string | null>(null);
  
  const cellSize = 10; // Adjust based on your needs

  // Query existing pixels
  const existingPixels = useQuery(api.pixels.getPixels);

  const mutate = useMutation(api.pixels.reservePixels);
  const generateUploadUrl = useMutation(api.pixels.generateImagesUploadUrl);

  // Render grid on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        // Check if cell is occupied
        const isOccupied = existingPixels?.some(
          pixel => 
            x >= pixel.x && 
            x < pixel.x + pixel.width && 
            y >= pixel.y && 
            y < pixel.y + pixel.height
        ) || false;

        // Check if cell is selected
        const isSelected = selectedCells.some(
          cell => cell.x === x && cell.y === y
        );

        // Set cell color
        if (isOccupied) {
          ctx.fillStyle = 'rgba(239, 68, 68, 0.5)'; // Red for occupied
        } else if (isSelected) {
          ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'; // Blue for selected
        } else {
          ctx.fillStyle = 'white';
        }

        // Draw cell
        ctx.fillRect(
          x * cellSize, 
          y * cellSize, 
          cellSize, 
          cellSize
        );
        ctx.strokeStyle = '#e5e7eb'; // Tailwind gray-200
        ctx.strokeRect(
          x * cellSize, 
          y * cellSize, 
          cellSize, 
          cellSize
        );
      }
    }
  }, [gridSize, existingPixels, selectedCells]);

  // Handle canvas click for cell selection
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);

    // Check if cell is already occupied
    const isOccupied = existingPixels?.some(
      pixel => 
        x >= pixel.x && 
        x < pixel.x + pixel.width && 
        y >= pixel.y && 
        y < pixel.y + pixel.height
    ) || false;

    if (!isOccupied) {
      const isSelected = selectedCells.some(
        cell => cell.x === x && cell.y === y
      );

      if (isSelected) {
        // Deselect
        setSelectedCells(
          selectedCells.filter(cell => cell.x !== x || cell.y !== y)
        );
      } else {
        // Select
        setSelectedCells([...selectedCells, { x, y }]);
      }
    }
  };

  // Image upload handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (image && selectedCells.length > 0) {
      // Find min and max x and y to determine width and height
      const minX = Math.min(...selectedCells.map(cell => cell.x));
      const maxX = Math.max(...selectedCells.map(cell => cell.x));
      const minY = Math.min(...selectedCells.map(cell => cell.y));
      const maxY = Math.max(...selectedCells.map(cell => cell.y));

      const width = maxX - minX + 1;
      const height = maxY - minY + 1;

      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": image.type },
        body: image,
      });

      const { storageId } = await result.json();
      try {
        const pixelId = await mutate({
          x: minX,
          y: minY,
          width,
          height,
          owner: "user-id", // Replace with actual user ID
          image: storageId,
          websiteUrl: url,
        });
        setReservedPixelId(pixelId);
        setShowPayment(true);
      } catch (error) {
        console.error("Failed to reserve pixels:", error);
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target && typeof event.target.result === "string") {
          try {
            onImageUpload(event.target.result, minX, minY, width, height);
          } catch (error) {
            console.error("Failed to upload image:", error);
          }
        }
      };
      reader.readAsDataURL(image);
    }
  };

  // Calculate total cost
  const totalCost = selectedCells.length;

  return (
    <div className="space-y-6 w-full my-3 mx-auto h-full bg-neutral-900 p-3 rounded-md">
      {!showPayment ? (
        <form onSubmit={handleSubmit} className="h-full space-y-4">
          <div className="w-3/5">
            <Label htmlFor="image">Upload Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="w-3/5">
            <Label htmlFor="url">Website URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="grid grid-cols-1 h-3/5 w-full">
            <Label>Select Pixels</Label>
            <ScrollArea 
              className="relative mt-2 h-fill w-fill p-d overflow-auto rounded-sm"
              style={{
                maxHeight: '500px',
                maxWidth: '100%'
              }}
            >
              <canvas
                ref={canvasRef}
                width={gridSize * cellSize}
                height={gridSize * cellSize}
                onClick={handleCanvasClick}
                style={{ 
                  border: '1px solid #ccc',
                  cursor: 'pointer'
                }}
              />
            </ScrollArea>
          </div>

          <div className="text-lg font-bold">
            Total Pixels Selected: {selectedCells.length}
            <br />
            Total Cost: ${totalCost}
          </div>
          <Button 
            type="submit"
            className="w-full border border-neutral-800 bg-neutral-950"
            disabled={selectedCells.length === 0 || !image}
          >
            Reserve Pixels
          </Button>
        </form>
      ) : (
        <PaymentForm
          amount={totalCost}
          pixelIds={reservedPixelId ? [reservedPixelId] : []}
          onSuccess={() => {
            setShowPayment(false);
            // Reset form
            setImage(null);
            setUrl("");
            setSelectedCells([]);
            setReservedPixelId(null);
          }}
        />
      )}
    </div>
  );
}