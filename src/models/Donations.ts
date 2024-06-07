import { model, models, Schema } from "mongoose";

export type Donation = {
  amount: number;
  name: string;
  message?: string;
  upiId: string;  // Added UPI ID field
  paid: boolean;
  email: string;
};

const donationSchema = new Schema({
  amount: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
  upiId: { type: String, required: true },  // Added UPI ID field in schema
  paid: { type: Boolean, default: false },
});

export const DonationModel = models?.Donation || model<Donation>('Donation', donationSchema);