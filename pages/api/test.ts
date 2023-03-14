import connectDb from "../../lib/db";
import Dataset from "../../lib/models/dataset";

export default async function handler(req, res) {
  await connectDb();

  try {
    const response = await Dataset.aggregate([
      {
        $lookup: {
          from: "users",
          let: {
            userid: "$user_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [
                    {
                      $toString: "$_id",
                    },
                    "$$userid",
                  ],
                },
              },
            },
          ],
          as: "user",
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$timestamp" },
            year: { $year: "$timestamp" },
            user_id: "$user_id",
          },
          total: { $sum: "$numberOfTagWords" },
        },
      },
    ]);
    // console.log("hello");

    res.json({ response });
  } catch (err) {
    console.log({ err });
    res.json({ err });
  }
}
