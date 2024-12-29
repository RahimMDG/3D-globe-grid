import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";


export const getPixels = query({
  args: {},
  handler: async (ctx) => {
    const pix = await ctx.db.query("pixels").collect();

    // const new_pix = await Promise.all(pix.map(async pic=>{
    //   const url = await ctx.storage.getUrl(pic.image as Id<"_storage">);
    //   if(!url){
    //     return pic
    //   }
    //   return{
    //     ...pic,
    //     image: url,
    //   }
    // }))

    return pix;
  },
});

export const generateImagesUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Helper function to check if two rectangles have any overlapping pixels
function hasPixelOverlap(
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number }
): boolean {
  // Generate bounds for both rectangles
  const rect1Right = rect1.x + rect1.width - 1;  // -1 because width includes starting position
  const rect1Bottom = rect1.y + rect1.height - 1;
  const rect2Right = rect2.x + rect2.width - 1;
  const rect2Bottom = rect2.y + rect2.height - 1;

  // Check if any pixel would overlap
  const hasOverlap = !(
    rect1Right < rect2.x ||     // rect1 is completely to the left
    rect1.x > rect2Right ||     // rect1 is completely to the right
    rect1Bottom < rect2.y ||    // rect1 is completely above
    rect1.y > rect2Bottom       // rect1 is completely below
  );

  return hasOverlap;
}

export const reservePixels = mutation({
  args: {
    x: v.number(),
    y: v.number(),
    width: v.number(),
    height: v.number(),
    websiteUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // First, get all pixels in the general area (using a slightly larger range for safety)
    const existing = await ctx.db
      .query("pixels")
      .filter((q) =>
        q.and(
          q.lte(q.field("x"), args.x + args.width),    // Existing starts before or at new area's end
          q.gte(
            q.add(q.field("x"), q.field("width")), 
            args.x
          ),                                           // Existing ends after or at new area's start
          q.lte(q.field("y"), args.y + args.height),   // Similar checks for y-axis
          q.gte(
            q.add(q.field("y"), q.field("height")), 
            args.y
          )
        )
      )
      .collect();

    // Check each existing pixel area for actual pixel overlap
    for (const existingPixel of existing) {
      if (hasPixelOverlap(args, existingPixel)) {
        console.log('overlap')
        return { 
          error: "overlap",
        };
      }
    }

    // If no collisions found, insert the new pixels
    const id = await ctx.db.insert("pixels", {
      ...args,
      paid: false,
    });

    return id;
  },
});

export const updatePixel = mutation({
  args: {
    image: v.string(),
    id: v.id("pixels"),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.image as Id<"_storage">);

    await ctx.db.patch(args.id, {
      image: url as string,
    });
  },
});
