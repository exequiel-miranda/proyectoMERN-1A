/*
    Colección: Sales
        product
        category
        customer
        total
        date
*/

import { model, Schema } from "mongoose";

const salesSchema = new Schema(
  {
    product: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0.01,
      max: 1000,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("sales", salesSchema);
