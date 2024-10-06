import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profile: {
      type: String,
    },
    ImgURL: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const user = model("User", userSchema);
