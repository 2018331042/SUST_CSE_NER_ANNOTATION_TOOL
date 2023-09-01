import mongoose, { Schema } from "mongoose";

const validateSchema = new mongoose.Schema({
  serial_no: { type: Number, unique: true, required: true },
  sentence: { type: String, required: true },
  tag_sentence: { type: Object, required: true, default: {} },
  numberOfTagWords: { type: Number, required: true, default: 0 },
  timestamp: { type: Date, default: Date.now },
  user_id: { type: String, ref: "User", default: null },
});

const Validate =
  mongoose.models.validate || mongoose.model("Validate", validateSchema);

export default Validate;
