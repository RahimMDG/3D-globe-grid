"use node"

import { v } from "convex/values"
import { action } from "./_generated/server"
import { api } from "./_generated/api"

import paypal from "@paypal/checkout-server-sdk";

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID!,
  process.env.PAYPAL_CLIENT_SECRET!
)
const client = new paypal.core.PayPalHttpClient(environment)

export const createPayment = action({
  args: {
    amount: v.number(),
    pixelIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const request = new paypal.orders.OrdersCreateRequest()
    request.prefer("return=representation")
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: args.amount.toString(),
          },
        },
      ],
    })

    try {
      const order = await client.execute(request)
      const paymentId:unknown = await ctx.runMutation(api.db.createPaymentInDb, {
        amount: args.amount,
        status: "PENDING",
        pixelIds: args.pixelIds,
        paypalOrderId: order.result.id,
      })
      return { orderId: order.result.id, paymentId: paymentId as string }
    } catch (error) {
      console.error("Failed to create PayPal order:", error)
      throw new Error("Failed to create payment")
    }
  },
})

export const capturePayment = action({
  args: {
    orderId: v.string(),
  },
  handler: async (ctx, args) => {
    console.log(args)
    const request = new paypal.orders.OrdersCaptureRequest(args.orderId)
    
    try {
      const capture = await client.execute(request)
      request.requestBody({
        payment_source: {
          token: capture.result.id
        }
      })
      console.log(capture)
      
      if (capture.result.status === "COMPLETED") {
        await ctx.runMutation(api.db.updatePaymentStatus, {
          id: args.orderId,
          status: "COMPLETED",
        })
        await ctx.runMutation(api.db.confirmPayment, {
          paymentId: args.orderId,
        })
        console.log("captured successfully")
        return { success: true }
      } else {
        throw new Error("Payment not completed")
      }
    } catch (error) {
      console.error("Failed to capture PayPal payment:", error)
      throw new Error("Failed to capture payment")
    }
  },
})

