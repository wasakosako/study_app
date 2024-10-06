import { Schema, model } from "mongoose";

const studySchema = new Schema(
  {
    username: {
      type: String,
      ref: "user",
    },
    subjectname: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const studySubject = model("studysubject", studySchema);
