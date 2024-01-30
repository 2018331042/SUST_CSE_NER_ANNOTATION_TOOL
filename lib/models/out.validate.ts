import mongoose, { Schema } from "mongoose";

const outValidateSchema = new mongoose.Schema({
  serial_no: { type: Number, unique: true, required: true },
  sentence: { type: String, required: true },
  tag_sentence: { type: Object, required: true, default: {} },
  numberOfTagWords: { type: Number, required: true, default: 0 },
  timestamp: { type: Date, default: Date.now },
  validator_id: { type: String, ref: "User", default: null },
});

const OutValidate =
  mongoose.models.validate || mongoose.model("Validate", outValidateSchema);

export default OutValidate;
