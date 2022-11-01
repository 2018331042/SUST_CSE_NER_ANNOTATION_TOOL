import readlineiter from "readlineiter";
import connectDb from "../../lib/db";
import Stats from "../../lib/models/stats";
import { FIND_ONE_SENTENCE } from "../../lib/server/queries";
export default async function handler(req, res) {
  const { id, numberOfWords } = req.body;
  await connectDb();
  try {
    // const newStat = new Stats({ user_id: id });
    // const stat = await newStat.save();
    // res.json({ stat });
    const get_stats = await Stats.findOne({ user_id: id });
    console.log({ get_stats });
    const update_words = get_stats.current_words + numberOfWords;
    console.log(get_stats.current_words);
    const update_sentence = get_stats.current_sentence + 1;
    const update_stats = await Stats.updateOne(
      { user_id: id },
      {
        $set: {
          current_words: update_words,
          current_sentence: update_sentence,
        },
      }
    );
    res.json({ update_stats });

    // const exists = await Stats.find({ current_words: { $exists: true } });
    // res.json({ exists });
  } catch (err) {
    res.json({ err });
  }
}
