import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
// import { api } from "../../convex/_generated/api";
// import { useMutation } from "convex/react";
// import { PaymentForm } from "./PaymentForm"

interface ImageUploadFormProps {
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
}: ImageUploadFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [url, setUrl] = useState("");
  // const [showPayment, setShowPayment] = useState(false);
  // const [reservedPixelId, setReservedPixelId] = useState<string | null>(null)

  // const mutate = useMutation(api.pixels.reservePixels);
  // const generateUploadUrl = useMutation(api.pixels.generateImagesUploadUrl);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      // const postUrl = await generateUploadUrl();
      // const result = await fetch(postUrl, {
      //   method: "POST",
      //   headers: { "Content-Type": image.type },
      //   body: image,
      // });

      // // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const { storageId } = await result.json();
      try {
        // const pixelId =
        // await mutate({
        //   x,
        //   y,
        //   width,
        //   height,
        //   owner: "user-id", // Replace with actual user ID
        //   image: storageId,
        //   websiteUrl: url,
        // });
        // setReservedPixelId(pixelId)
        // setShowPayment(true);
      } catch (error) {
        console.error("Failed to reserve pixels:", error);
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target && typeof event.target.result === "string") {
          try {
            // setShowPayment(true);
            onImageUpload(event.target.result, x, y, width, height);
          } catch (error) {
            console.error("Failed to reserve pixels:", error);
          }
        }
      };
      reader.readAsDataURL(image);
    }
  };

  const totalCost = width * height;

  return (
    <div className="space-y-6">
      {/* {!showPayment ? ( */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <Label htmlFor="url">Website URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="x">X Position (0-{gridSize - 1})</Label>
              <Input
                id="x"
                type="number"
                min={0}
                max={gridSize - 1}
                value={x}
                onChange={(e) => setX(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="y">Y Position (0-{gridSize - 1})</Label>
              <Input
                id="y"
                type="number"
                min={0}
                max={gridSize - 1}
                value={y}
                onChange={(e) => setY(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="width">Width (1-{gridSize})</Label>
              <Input
                id="width"
                type="number"
                min={1}
                max={gridSize}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="height">Height (1-{gridSize})</Label>
              <Input
                id="height"
                type="number"
                min={1}
                max={gridSize}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="text-lg font-bold">Total Cost: ${totalCost}</div>
          <Button type="submit">Reserve Pixels</Button>
        </form>
      {/* ) : (
        // <></>
        // <PaymentForm
        //   amount={totalCost}
        //   pixelIds={reservedPixelId ? [reservedPixelId] : []}
        //   onSuccess={() => {
        //     setShowPayment(false)
        //     // Reset form
        //     setImage(null)
        //     setUrl("")
        //     setWidth(1)
        //     setHeight(1)
        //     setReservedPixelId(null)
        //   }}
        // />
      )} */}
    </div>
  );
}
