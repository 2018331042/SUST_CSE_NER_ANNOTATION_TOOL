import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  current_words: { type: Number, required: true, default: 0 },
  current_sentence: { type: Number, required: true, default: 0 },
  daily_words: { type: Number, required: true, default: 0 },
  daily_sentence: { type: Number, required: true, default: 0 },
  weekly_words: { type: Number, required: true, default: 0 },
  weekly_sentence: { type: Number, required: true, default: 0 },
  last_words_daily: { type: Number, required: true, default: 0 },
  last_sentence_daily: { type: Number, required: true, default: 0 },
  last_words_weekly: { type: Number, required: true, default: 0 },
  last_sentence_weekly: { type: Number, required: true, default: 0 },
  user_id: { type: String, ref: "User" },
});

const Stats = mongoose.models.Stats || mongoose.model("Stats", statsSchema);

export default Stats;
