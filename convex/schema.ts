import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
 
const schema = defineSchema({
  ...authTables,
  pixels: defineTable({
    owner: v.string(),
    image: v.string(),
    websiteUrl: v.string(),
    x: v.number(),
    y: v.number(),
    width: v.number(),
    height: v.number(),
    paid: v.boolean(),
  }).index("by_coordinates", ["x", "y"]),
  payments: defineTable({
    userId: v.string(),
    amount: v.number(),
    status: v.string(),
    pixelIds: v.array(v.string()),
    paypalOrderId: v.string(),
  }),
});

export default schema;