/*
    Campos:
        nombre
        descripcion
        precio
        stock
*/

import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
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

    address: {
      type: String,
    },

    password: {
      type: String,
      require: true,
    },
    hireDate: {
      type: String,
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
    issnumber: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("employee", employeeSchema);
