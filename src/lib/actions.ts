"use server";

import { z } from "zod";

const addressSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid mobile number"),
});

const paymentSchema = z.object({
  cardNumber: z.string().length(16, "Card number must be 16 digits"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvc: z.string().length(3, "CVC must be 3 digits"),
});

export const checkoutSchema = addressSchema.merge(paymentSchema);

export async function placeOrder(data: z.infer<typeof checkoutSchema>) {
  try {
    const validatedData = checkoutSchema.parse(data);

    // Simulate backend processes:
    // 1. Process payment with a mock gateway
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    console.log("Payment processed for:", validatedData.name);

    // 2. Update inventory (mock)
    console.log("Inventory updated.");

    // 3. Create order in database (mock)
    const orderId = `order_${Math.random().toString(36).substr(2, 9)}`;
    console.log(`Order ${orderId} created.`);
    
    // 4. Send email confirmation (mock)
    console.log(`Order confirmation email sent to ${validatedData.email}`);
    
    return { success: true, orderId: orderId };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    console.error("Checkout error:", error);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}
