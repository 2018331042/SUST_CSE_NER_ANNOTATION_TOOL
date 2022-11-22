import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import Dataset from "../../../lib/models/dataset";
import Stats from "../../../lib/models/stats";
import { skippedTags } from "../../../utils/skippedTags";
import jwt from "jsonwebtoken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tags, sen_id, token, numberOfWords } = req.body;
  const isSkip = skippedTags(tags);
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  try {
    await connectDb();
    let response;
    console.log(Date());

    if (isSkip) {
      response = await Dataset.updateOne(
        { _id: sen_id },
        {
          $set: {
            tag_sentence: tags,
            isAnnotated: true,
            isSkipped: true,
            numberOfTagWords: numberOfWords,
            timestamp: Date(),
          },
        }
      );
    } else {
      response = await Dataset.updateOne(
        { _id: sen_id },
        {
          $set: {
            tag_sentence: tags,
            isAnnotated: true,
            isSkipped: false,
            numberOfTagWords: numberOfWords,
            timestamp: Date(),
          },
        }
      );
      if (response.modifiedCount === 1) {
        const get_stats = await Stats.findOne({ user_id: id });
        console.log({ get_stats });
        const update_words = get_stats.current_words + numberOfWords;
        const update_sentence = get_stats.current_sentence + 1;
        const update_stats = await Stats.updateOne(
          { user_id: id },
          {
            $set: {
              current_words: update_words,
              current_sentence: update_sentence,
            },
          }
        );
        console.log({ update_stats });
      }
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
