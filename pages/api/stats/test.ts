import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import Dataset from "../../../lib/models/dataset";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();

  try {
    const response = await Dataset.aggregate([
      { $match: { isAnnotated: true } },
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
    res.json({ response });
  } catch (err) {
    res.json({ err });
  }
}
