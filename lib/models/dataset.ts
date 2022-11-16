import mongoose, { Schema } from "mongoose";

const datasetSchema = new mongoose.Schema({
  serial_no: { type: Number, unique: true, required: true },
  sentence: { type: String, required: true },
  lock: { type: Boolean, required: true, default: false },
  tag_sentence: { type: Object, required: true, default: {} },
  isAnnotated: { type: Boolean, required: true, default: false },
  isSkipped: { type: Boolean, required: true, default: false },
  isGarbage: { type: Boolean, required: true, default: false },
  numberOfTagWords: { type: Number, required: true, default: 0 },
  skippedBy: [{ type: String }],
  timestamp: { type: Date, default: Date.now },
  user_id: { type: String, ref: "User", default: null },
});

const Dataset =
  mongoose.models.Dataset || mongoose.model("Dataset", datasetSchema);

export default Dataset;
