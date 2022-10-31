import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import Dataset from "../../../lib/models/dataset";
import { skippedTags } from "../../../utils/skippedTags";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tags, sen_id } = req.body;
  console.log({ sen_id });
  const isSkip = skippedTags(tags);
  console.log({ isSkip });

  try {
    await connectDb();
    let response;
    if (isSkip) {
      response = await Dataset.updateOne(
        { _id: sen_id },
        { $set: { tag_sentence: tags, isAnnotated: true, isSkipped: true } }
      );
    } else {
      response = await Dataset.updateOne(
        { _id: sen_id },
        { $set: { tag_sentence: tags, isAnnotated: true, isSkipped: false } }
      );
    }

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
