import React, { useRef, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { PaymentForm } from "./PaymentForm";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Id } from "convex/_generated/dataModel";
import { Checkbox } from "./ui/checkbox";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { isErrorResponse } from "@/lib/utils";

// Zod schema for form validation
const formSchema = z.object({
  image: z.instanceof(File).optional(),
  url: z.string().url({ message: "Please enter a valid URL" }),
  terms: z.boolean({ message: "Please accept terms to make purchase" }),
});

// Type for form values
type FormValues = z.infer<typeof formSchema>;

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
  const [selectedCells, setSelectedCells] = useState<
    { x: number; y: number }[]
  >([]);
  const [showPayment, setShowPayment] = useState(false);
  const [reservedPixelId, setReservedPixelId] = useState<string | null>(null);

  const cellSize = 10; // Adjust based on your needs


  // Clear selection handler
  const handleClearSelection = () => {
    setSelectedCells([]);
  }


  // Query existing pixels
  const existingPixels = useQuery(api.pixels.getPixels);

  const mutate = useMutation(api.pixels.reservePixels);
  const updatePixel = useMutation(api.pixels.updatePixel);
  const generateUploadUrl = useMutation(api.pixels.generateImagesUploadUrl);

  // Form setup with React Hook Form and Zod
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      url: "",
      terms: false,
    },
  });

  // Adjust selection to maintain rectangular shape
  const adjustRectangularSelection = (
    currentCells: { x: number; y: number }[]
  ) => {
    if (currentCells.length === 0) return currentCells;
    if (currentCells.length === 1) return currentCells;

    // Find the bounds of the current selection
    const xs = currentCells.map((cell) => cell.x);
    const ys = currentCells.map((cell) => cell.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const adjustedCells: { x: number; y: number }[] = [];

    // Rebuild the rectangle while avoiding occupied pixels
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        // Check if the cell is not already occupied
        const isOccupied =
          existingPixels?.some(
            (pixel) =>
              x >= pixel.x &&
              x < pixel.x + pixel.width &&
              y >= pixel.y &&
              y < pixel.y + pixel.height
          ) || false;

        if (!isOccupied) {
          adjustedCells.push({ x, y });
        }
      }
    }

    return adjustedCells;
  };

  // Render grid on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        // Check if cell is occupied
        const isOccupied =
          existingPixels?.some(
            (pixel) =>
              x >= pixel.x &&
              x < pixel.x + pixel.width &&
              y >= pixel.y &&
              y < pixel.y + pixel.height
          ) || false;

        // Check if cell is selected
        const isSelected = selectedCells.some(
          (cell) => cell.x === x && cell.y === y
        );

        ctx.fillStyle = isOccupied
          ? "#fca5a5"
          : isSelected
            ? "#67e8f9"
            : "#404040";

        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        ctx.strokeStyle = "#525252";
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
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
    const isOccupied =
      existingPixels?.some(
        (pixel) =>
          x >= pixel.x &&
          x < pixel.x + pixel.width &&
          y >= pixel.y &&
          y < pixel.y + pixel.height
      ) || false;

    if (!isOccupied) {
      const isSelected = selectedCells.some(
        (cell) => cell.x === x && cell.y === y
      );

      let newSelectedCells;
      if (isSelected) {
        // If only one cell, simply deselect
        if (selectedCells.length === 1) {
          newSelectedCells = [];
        } else {
          // Find the bounds of the current selection
          const xs = selectedCells.map((cell) => cell.x);
          const ys = selectedCells.map((cell) => cell.y);
          const minX = Math.min(...xs);
          const maxX = Math.max(...xs);
          const minY = Math.min(...ys);
          const maxY = Math.max(...ys);

          // Determine if the clicked cell is on the edge
          const isOnLeftEdge = x === minX;
          const isOnRightEdge = x === maxX;
          const isOnTopEdge = y === minY;
          const isOnBottomEdge = y === maxY;

          // Remove cells based on the cell's position
          newSelectedCells = selectedCells.filter((cell) => {
            if (isOnLeftEdge && cell.x === x) return false;
            if (isOnRightEdge && cell.x === x) return false;
            if (isOnTopEdge && cell.y === y) return false;
            if (isOnBottomEdge && cell.y === y) return false;
            return true;
          });

          // Adjust to maintain rectangular shape
          newSelectedCells = adjustRectangularSelection(newSelectedCells);
        }
      } else {
        // Add new cell and complete the rectangle
        newSelectedCells = adjustRectangularSelection([
          ...selectedCells,
          { x, y },
        ]);

        // console.log(newSelectedCells)
      }

      setSelectedCells(newSelectedCells);
    }
  };

  // Function to handle image upload
  const uploadImage = async (
    image: File,
    minX: number,
    minY: number,
    width: number,
    height: number
  ) => {
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": image.type },
      body: image,
    });

    const { storageId } = await result.json();
    updatePixel({
      id: reservedPixelId as Id<"pixels">,
      image: storageId as string,
    });

    // Call the onImageUpload prop to handle post-upload behavior
    // onImageUpload(storageId, minX, minY, width, height);

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
    reader.readAsDataURL(form.getValues("image"));
  };
  // Form submission handler
  const onSubmit = async (values: FormValues) => {
    if (values.image && selectedCells.length > 0) {
      // Find min and max x and y to determine width and height
      const minX = Math.min(...selectedCells.map((cell) => cell.x));
      const maxX = Math.max(...selectedCells.map((cell) => cell.x));
      const minY = Math.min(...selectedCells.map((cell) => cell.y));
      const maxY = Math.max(...selectedCells.map((cell) => cell.y));

      const width = maxX - minX + 1;
      const height = maxY - minY + 1;

      try {
        const pixelId = await mutate({
          x: minX,
          y: minY,
          width,
          height,
          websiteUrl: values.url,
        });
        if (isErrorResponse(pixelId)) {
          toast.error("Overlap", {
            description:
              "Pixels should not overlap or go over already purchased pixels",
            richColors: true,
          });
        } else {
          setReservedPixelId(pixelId);
          setShowPayment(true);
        }
      } catch (error) {
        console.error("Failed to reserve pixels:", error);
      }
    }
  };

  // Calculate total cost
  const totalCost = selectedCells.length;

  return (
    <div className="w-full p-4 mx-auto h-full bg-neutral-900 rounded-md">
      {!showPayment ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full space-y-4"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field, fieldState }) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [previewImage, setPreviewImage] = React.useState<
                  string | null
                >(null);

                const handleFileChange = (file: File | null) => {
                  if (file) {
                    field.onChange(file); // Update form state
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (reader.result && typeof reader.result === "string") {
                        setPreviewImage(reader.result); // Set image preview
                      }
                    };
                    reader.readAsDataURL(file);
                  } else {
                    setPreviewImage(null);
                    field.onChange(null); // Reset form state
                  }
                };

                const handleFileInputChange = (
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  const file = e.target.files?.[0] || null;
                  handleFileChange(file);
                };

                const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
                  e.preventDefault();
                };

                const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0] || null;
                  handleFileChange(file);
                };

                return (
                  <FormItem className="w-full">
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      {previewImage ? (
                        <div className="relative">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-64 object-cover rounded-md"
                          />
                          <Button
                            size="icon"
                            type="button"
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full"
                            onClick={() => handleFileChange(null)}
                          >
                            ✕
                          </Button>
                        </div>
                      ) : (
                        <div
                          className="flex items-center h-64 justify-center p-4 border-2 border-dashed border-neutral-500 rounded-md cursor-pointer bg-neutral-800"
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileInputChange}
                            className="hidden"
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center text-neutral-300"
                          >
                            <span className="text-sm font-medium text-center">
                              Drag & drop an image here, or click to upload
                            </span>
                            <svg
                              className="w-8 h-8 mt-2 text-neutral-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 16v4a1 1 0 001 1h16a1 1 0 001-1v-4M16 8l-4-4m0 0L8 8m4-4v12"
                              />
                            </svg>
                          </label>
                        </div>
                      )}
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h4 className="mt-8">Select Pixels</h4>
            <div className="grid grid-cols-1 h-3/5 w-full p-1 bg-neutral-600 rounded-md border border-neutral-300">
              <div className="flex justify-end mb-2">
                <Button
                  onClick={handleClearSelection}
                  className="w-full "
                  disabled={selectedCells.length === 0}
                >
                  Clear Selection
                </Button>
              </div>
              <ScrollArea
                className="relative h-fill w-fill"
                style={{
                  maxHeight: "500px",
                  maxWidth: "100%",
                }}
              >
                <canvas
                  ref={canvasRef}
                  width={gridSize * cellSize}
                  height={gridSize * cellSize}
                  onClick={handleCanvasClick}
                  className="border border-neutral-400 cursor-pointer"
                />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </label>
                    <p className="text-sm text-muted-foreground">
                      You agree to our{" "}
                      <NavLink to="/terms" className="text-indigo-600">
                        Terms of Service and Privacy Policy
                      </NavLink>
                      .
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <div className="text-lg font-bold">
              Total Pixels Selected: {selectedCells.length}
              <br />
              Total Cost: ${totalCost}
            </div>
            <Button
              type="submit"
              className="w-full border text-neutral-200 hover:text-neutral-700 border-neutral-800 bg-neutral-950"
              disabled={selectedCells.length === 0 || !form.watch("image")}
            >
              Reserve Pixels
            </Button>
          </form>
        </Form>
      ) : (
        <PaymentForm
          amount={selectedCells.length}
          pixelIds={reservedPixelId ? [reservedPixelId] : []}
          onSuccess={async () => {
            setShowPayment(false);
            setSelectedCells([]);
            setReservedPixelId(null);

            // Upload the image on successful payment
            const minX = Math.min(...selectedCells.map((cell) => cell.x));
            const minY = Math.min(...selectedCells.map((cell) => cell.y));
            const width =
              Math.max(...selectedCells.map((cell) => cell.x)) - minX + 1;
            const height =
              Math.max(...selectedCells.map((cell) => cell.y)) - minY + 1;

            const image = form.getValues("image");
            if (image) {
              await uploadImage(image, minX, minY, width, height);
            }
          }}
        />
      )}
    </div>
  );
}
