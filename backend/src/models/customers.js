/*
    Campos:
        nombre
        descripcion
        precio
        stock
*/

import { Schema, model } from "mongoose";

const customersSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    lastName: {
      type: String,
    },

    birthday: {
      type: Date,
      require: true,
    },

    email: {
      type: String,
    },

    password: {
      type: String,
      require: true,
    },

    telephone: {
      type: String,
      require: true,
    },

    dui: {
      type: String,
      require: true,
    },
    isVerified: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("customers", customersSchema);
