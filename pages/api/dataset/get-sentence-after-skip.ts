import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import Dataset from "../../../lib/models/dataset";
import {
  FIND_ONE_SENTENCE,
  LOCK_SENTENCE_TO_USER,
} from "../../../lib/server/queries";
import jwt from "jsonwebtoken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb();
  const { sen_id, token } = req.body;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const result = await FIND_ONE_SENTENCE(id);
    console.log(result);

    if (result) {
      const response = await LOCK_SENTENCE_TO_USER(result._id, id);
      console.log({ response });

      if (response.modifiedCount === 1) {
        const resetResponse = await Dataset.updateOne(
          { _id: sen_id },
          { $set: { lock: false, user_id: null }, $push: { skippedBy: id } }
        );
        if (resetResponse.modifiedCount === 1) {
          return res.json({
            data: result,
            status: "SUCCESS",
            message: "successful",
          });
        }
      }
    } else {
      return res.json({
        data: "",
        status: "FAILED",
        message: "No data available",
      });
    }
  } catch (err) {
    console.log({ err });
  }
};
