import mongoose from "mongoose";

import dayjs from "dayjs";

const DayJS = dayjs();

const fileSchema = mongoose.Schema({
  fileName: {
    type: String,
    minLength: 1,
    maxLength: 255,
    required: true,
  },
  fileSize: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: String,
    default: DayJS.format("YYYY-MM-DD_HH:mm:ss"),
  },
});

export default mongoose.model("FileSchema", fileSchema);
