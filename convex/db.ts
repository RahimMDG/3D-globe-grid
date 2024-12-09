import { v } from "convex/values";
import { internalMutation, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

export const createPaymentInDb = mutation({
  args: {
    amount: v.number(),
    status: v.string(),
    pixelIds: v.array(v.string()),
    paypalOrderId: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the current authenticated user
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return { error: "Not authenticated" };
    }

    // Insert the payment record into the database
    const paymentId = await ctx.db.insert("payments", {
      userId: userId,
      amount: args.amount,
      status: args.status,
      pixelIds: args.pixelIds,
      paypalOrderId: args.paypalOrderId,
    });

    return paymentId;
  },
});

export const updatePaymentStatus = mutation({
  args: {
    id: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the current payment record
    const payment = await ctx.db.query("payments").filter((q) => q.eq(q.field("paypalOrderId"), args.id)).unique()

    if (!payment) {
      throw new Error("Payment not found");
    }

    // Update the payment status
    await ctx.db.patch(payment._id, {
      status: args.status,
    });

    return { success: true };
  },
});

export const confirmPayment = mutation({
  args: {
    paymentId: v.string(),
  },
  handler: async (ctx, args) => {
    const payment = await ctx.db.query("payments").filter((q) => q.eq(q.field("paypalOrderId"), args.paymentId)).unique()
    if (!payment) {
      throw new Error("Payment not found")
    }

    for (const pixelId of payment.pixelIds) {
      await ctx.db.patch(pixelId as Id<"pixels">, {
        paid: true,
      })
    }
  },
})

export const cleanupUnpaidPixels = internalMutation({
  handler: async (ctx) => {
    // Get current timestamp
    const oneMinuteAgo = Date.now() - 60000; // 60000 ms = 1 minute

    // Find unpaid pixels older than 1 minute
    const unpaidPixels = await ctx.db
      .query("pixels")
      .filter((q) => q.and(
        q.eq(q.field("paid"), false),
        q.lte(q.field("_creationTime"), oneMinuteAgo)
      ))
      .collect();

    // Delete unpaid pixels
    for (const pixel of unpaidPixels) {
      await ctx.db.delete(pixel._id);
    }

    return unpaidPixels.length;
  }
});