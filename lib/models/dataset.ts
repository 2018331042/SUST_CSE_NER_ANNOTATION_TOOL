import mongoose, { Schema } from "mongoose";

const datasetSchema = new mongoose.Schema({
  serial_no: { type: Number, unique: true, required: true },
  sentence: { type: String, required: true },
  lock: { type: Boolean, required: true, default: false },
  tag_sentence: { type: Object, required: true, default: {} },
  timestamp: { type: Date, default: Date.now },
  user_id: { type: Schema.Types.ObjectId, ref: "User", default: null },
});

const Dataset =
  mongoose.models.Dataset || mongoose.model("Dataset", datasetSchema);

export default Dataset;
