import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import Dataset from "../../../lib/models/dataset";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();

    const data = await Dataset.findOne({ lock: false }).lean();
    console.log({ data });

    if (data) {
      const update_lock = await Dataset.updateOne(
        { _id: data._id },
        { $set: { lock: true } }
      );
      console.log({ update_lock });

      if (update_lock.modifiedCount === 1) {
        res.json({ data: data, status: "SUCCESS", message: "successful" });
      }
    } else {
      res.json({ data: null, message: "No unlocked data avalilable" });
    }
  } catch (err) {
    console.log({ err });
  }
}
