import readlineiter from "readlineiter";
import connectDb from "../../lib/db";
import Dataset from "../../lib/models/dataset";
import Stats from "../../lib/models/stats";
import {
  FIND_ANNOTATORS,
  FIND_ONE_SENTENCE,
  GET_STATS_TABLE_INFO,
} from "../../lib/server/queries";
import fs from "fs";
export default async function handler(req, res) {
  // const { id, numberOfWords } = req.body;
  await connectDb();
  try {
    // const newStats = new Stats({ user_id: id });
    // const stats = await newStats.save();

    // const annotators = await FIND_ANNOTATORS();
    // console.log(annotators);
    // res.json({ annotators });

    const data = await Dataset.aggregate([
      { $match: { isSkipped: false, isAnnotated: true } },
      { $limit: 10 },
    ]);
    let arr = [];
    let finetuned = data.map((e) => {
      for (const [key, value] of Object.entries(e.tag_sentence)) {
        arr.push({
          sentence: e.sentence,
          words: key,
          labels: value,
        });
      }
      return arr;
    });
    // console.log({ finetuned });
    fs.writeFile("Output.json", finetuned, (err) => {
      // In case of a error throw err.
      if (err) throw err;
    });
    res.json({ finetuned });
  } catch (err) {
    res.json({ err });
  }
}
