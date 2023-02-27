import readlineiter from "readlineiter";
import connectDb from "../../lib/db";
import Stats from "../../lib/models/stats";
import { FIND_ANNOTATORS, FIND_ONE_SENTENCE, GET_STATS_TABLE_INFO } from "../../lib/server/queries";
export default async function handler(req, res) {
  // const { id, numberOfWords } = req.body;
  await connectDb();
  try {
    // const newStats = new Stats({ user_id: id });
    // const stats = await newStats.save();

    // const annotators = await FIND_ANNOTATORS();
    // console.log(annotators);
    // res.json({ annotators });

    const stats = await GET_STATS_TABLE_INFO();
    stats.map( (stat) => console.log(stat.current_words, stat.current_sentence, stat.user[0].name))
    res.json({stats})
  } catch (err) {
    res.json({ err });
  }
}
