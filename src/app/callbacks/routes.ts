import { DonationModel } from "@/models/Donations";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

async function handler(req: NextRequest) {
  const data = await req.json();
  await mongoose.connect(process.env.MONGODB_URI as string);
  const { status, order_id, upiId } = data;  // Include upiId in the destructuring

  if (status === 'paid') {
    // Update the document to mark as paid and store the UPI ID
    await DonationModel.findByIdAndUpdate(order_id, { paid: true, upiId: upiId });
  }
  console.log({ data });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export { handler as GET, handler as POST };