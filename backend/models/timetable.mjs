import { Schema, model } from "mongoose";

const timetableSchema = new Schema(
  {
    subject_id: {
      type: Schema.Types.ObjectId,
      ref: "studySubject",
      required: true,
    },
    subjectname: {
      type: String,
      required: true,
    },
    sumtime: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const timetable = model("TimeTable", timetableSchema);
