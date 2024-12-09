import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
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
    console.log(args)

    const url = await ctx.storage.getUrl(args.image as Id<"_storage">);

    const id = await ctx.db.insert("pixels", {
      ...args,
      image: url as string,
      paid: false,
    })

    return id;
  },
})

