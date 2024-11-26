import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

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
    id: v.id("payments"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the current payment record
    const payment = await ctx.db.get(args.id);

    if (!payment) {
      throw new Error("Payment not found");
    }

    // Update the payment status
    await ctx.db.patch(args.id, {
      status: args.status,
    });

    return { success: true };
  },
});
