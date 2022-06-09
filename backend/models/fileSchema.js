import mongoose from "mongoose";

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
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("FileSchema", fileSchema);
