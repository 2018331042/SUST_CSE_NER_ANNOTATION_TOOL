// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../lib/db";
import Validate from "../../lib/models/validate";
import Dataset from "../../lib/models/dataset";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hello");

  try {
    const response = await Dataset.aggregate([
      {
        $lookup: {
          from: "users",
          let: { userid: "$validate_user_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$userid" }],
                },
              },
            },
          ],
          as: "validate_user_info",
        },
      },
      {
        $match: {
          validate_user_id: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$validate_user_id",
          count: { $sum: 1 },
          validate_user_info: { $first: "$validate_user_info" },
        },
      },
    ]);

    console.log(response[0].validate_user_info[0]);

    res.status(200).json({ response });
  } catch (err) {
    console.log({ err });
  }
}
