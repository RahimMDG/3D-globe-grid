import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

interface PaymentFormProps {
  amount: number;
  pixelIds: string[];
  onSuccess: () => void;
}

export function PaymentForm({ amount, pixelIds, onSuccess }: PaymentFormProps) {
  const createPayment = useAction(api.payments.createPayment);
  const capturePayment = useAction(api.payments.capturePayment);

  return (
    <PayPalScriptProvider
      options={{
        clientId: "AYCmwKPuisOU1lrFbVdqLGvNOCDu4LyUNmpD378qR-5z5z2TKbT6HCRf9Kulc8dTZcFkPkP5TlDT6pxV",
        currency: "USD"
      }}
    >
      <div className="space-y-4">
        <div className="text-lg font-bold">
          Total Amount: ${amount.toFixed(2)}
        </div>
        <PayPalButtons
          createOrder={async () => {
            const { orderId } = await createPayment({ amount, pixelIds });
            return orderId;
          }}
          onApprove={async (data, actions) => {
            const { orderID } = data;

            const result = await capturePayment({
              orderId: orderID,
            });

            console.log(result)

            if (result.success) {
              onSuccess();
            } else {
              console.error("Failed to capture payment");
            }

            await actions.order?.capture();
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}