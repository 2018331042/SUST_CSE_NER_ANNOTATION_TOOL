import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import Dataset from "../../../lib/models/dataset";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tags, sen_id, user_id } = req.body;

  try {
    await connectDb();

    const response = await Dataset.updateOne(
      { _id: sen_id },
      { $set: { tag_sentence: tags } }
    );

    console.log({ response });
    if (response.modifiedCount === 1) {
      res.json({
        status: "SUCCESS",
        message: "Tag words updated Successfully",
      });
    } else {
      res.json({
        status: "FAILED",
        message: "Unsuccessful Attempts",
      });
    }
  } catch (err) {
    console.log({ err });
    res.json({
      status: "FAILED",
      message: "Something went wrong",
    });
  }
}
