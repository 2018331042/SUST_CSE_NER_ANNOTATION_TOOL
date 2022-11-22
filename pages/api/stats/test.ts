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
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
            hour: { $hour: { date: "$timestamp", timezone: "Asia/Dhaka" } },
          },
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
    // console.log(Date());
    // const response = await Dataset.aggregate([
    //   { $match: { isAnnotated: true, user_id: "637882171d8a5fe658185f57" } },
    //   {
    //     $project: {
    //       y: { $year: "$timestamp" },
    //       m: { $month: "$timestamp" },
    //       d: { $dayOfMonth: "$timestamp" },
    //       h: { $hour: { date: "$timestamp", timezone: "Asia/Dhaka" } },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: { day: "$d" },
    //       count: { $sum: 1 },
    //       numberOfWords: { $sum: "$numberOfTagWords" },
    //     },
    //   },
    // ]);
    // res.json({ response });
  } catch (err) {
    res.json({ err });
    console.log({ err });
  }
}
