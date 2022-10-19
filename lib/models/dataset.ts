import mongoose from "mongoose";

const datasetSchema = new mongoose.Schema({
  sentence: { type: String, required: true },
  lock: { type: Boolean, required: true, default: false },
  tag_sentence: { type: Object, required: true, default: {} },
  timestamp: { type: Date, default: Date.now },
});

const Dataset =
  mongoose.models.Dataset || mongoose.model("Dataset", datasetSchema);

export default Dataset;
