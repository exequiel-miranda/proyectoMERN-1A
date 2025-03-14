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
      min: 0,
    },

    email: {
        type: String,
      },

    password: {
      type: Number,
      require: true,
      min: 8,
    },

    telephone: {
        type: Number,
        require: true,
        min: 8,
      },

      dui: {
        type: Number,
        require: true,
        min: 9,
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
