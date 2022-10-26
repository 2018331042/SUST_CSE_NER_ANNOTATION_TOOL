import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import Dataset from "../../../lib/models/dataset";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { sen_id, tags } = req.body;

  try {
    await connectDb();
    const result = await Dataset.updateOne(
      { _id: sen_id },
      { $set: { tag_sentence: tags } }
    );

    console.log({ result });

    if (result.modifiedCount === 1) {
      return res.json({
        status: "SUCCESS",
        message: "Updated tag sentence successful",
      });
    } else {
      return res.json({
        status: "FAILED",
        message: "something went wrong",
      });
    }
  } catch (err) {
    console.log({ err });
  }
};
