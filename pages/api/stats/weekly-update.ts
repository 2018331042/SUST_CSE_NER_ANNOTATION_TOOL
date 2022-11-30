import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import Stats from "../../../lib/models/stats";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();

  try {
    const get_stats = await Stats.find({});

    const update_stats = get_stats.map((e) => {
      return {
        id: e._id,
        words: e.current_words - e.last_words_weekly,
        sentences: e.current_sentence - e.last_sentence_weekly,
        updated_words: e.current_words,
        update_sentences: e.current_sentence,
      };
    });

    update_stats.map(
      async (e) =>
        await Stats.updateOne(
          { _id: e.id },
          {
            $set: {
              daily_words: e.words,
              daily_sentence: e.sentences,
              last_words_weekly: e.updated_words,
              last_sentence_weekly: e.update_sentences,
            },
          }
        )
    );
    res.json({ message: "successful" });
  } catch (err) {
    console.log({ err });
  }
}
