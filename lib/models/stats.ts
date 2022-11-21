import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  current_words: { type: Number, required: true, default: 0 },
  current_sentence: { type: Number, required: true, default: 0 },
  user_id: { type: String, ref: "User" },
});

const Stats = mongoose.models.Stats || mongoose.model("Stats", statsSchema);

export default Stats;
