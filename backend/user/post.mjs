import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    username: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
    },
    ProfileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = model("post", postSchema);
