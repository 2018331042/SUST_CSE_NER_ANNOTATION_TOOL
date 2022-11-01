import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  current_words: { type: Number, required: true },
  current_sentence: { type: Number, required: true },
  daily_words: { type: Number, required: true },
  daily_sentence: { type: Number, required: true },
  weekly_words: { type: Number, required: true },
  weekly_sentence: { type: Number, required: true },
  user_id: { type: String, ref: "User" },
});

const Stats = mongoose.models.Stats || mongoose.model("Stats", statsSchema);

export default Stats;
