import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getPixels = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("pixels").collect()
  },
})

export const generateImagesUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const reservePixels = mutation({
  args: {
    x: v.number(),
    y: v.number(),
    width: v.number(),
    height: v.number(),
    owner: v.string(),
    image: v.string(),
    websiteUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if pixels are available
    const existing = await ctx.db
      .query("pixels")
      .filter((q) => 
        q.and(
          q.gte(q.field("x"), args.x),
          q.lte(q.field("x"), args.x + args.width),
          q.gte(q.field("y"), args.y),
          q.lte(q.field("y"), args.y + args.height)
        )
      )
      .collect()

    if (existing.length > 0) {
      throw new Error("Pixels already taken")
    }

    const id = await ctx.db.insert("pixels", {
      ...args,
      paid: false,
    })

    return id;
  },
})

