import { Schema, model } from "mongoose";

const studySchema = new Schema(
  {
    subjectname: {
      type: String,
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    endtime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const StudySession = model("study", studySchema);
