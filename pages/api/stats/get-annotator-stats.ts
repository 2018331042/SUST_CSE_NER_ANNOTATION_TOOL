import { NextApiRequest, NextApiResponse } from "next";
import Dataset from "../../../lib/models/dataset";
import Stats from "../../../lib/models/stats";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;
    const dailyData = await Dataset.aggregate([
      { $match: { isAnnotated: true, user_id: id } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          count: { $sum: 1 },
          numberOfWords: { $sum: "$numberOfTagWords" },
        },
      },
      {
        $project: {
          _id: 0,
          Date: "$_id",
          sentences: "$count",
          words: "$numberOfWords",
        },
      },
    ]);
    console.log({ dailyData });
    const findStats = await Stats.find({ user_id: id });
    console.log({ findStats });
    const overAllData = findStats.map((e) => {
      return {
        totalWords: e.current_words,
        totalSentences: e.current_sentence,
      };
    });
    console.log({ overAllData });
    res.json({ dailyData, overAllData });
  } catch (err) {
    res.json({ err });
    console.log({ err });
  }
}
