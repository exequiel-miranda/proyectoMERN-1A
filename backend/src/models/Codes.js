import { Schema, model } from "mongoose";

const codesSchema = new Schema(
  {
        name: {
            type: String,
            require: true
        },
        tipo: {
            type: String
        },
        fecha: {
            type: String
        }
  },{
    timestamps: true,
    strict: false
  }
)

export default model("codes", codesSchema)