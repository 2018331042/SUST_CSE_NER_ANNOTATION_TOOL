import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import Dataset from "../../../lib/models/dataset";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import {
  FIND_LOCKED_SENTENCE_TO_USER,
  FIND_ONE_SENTENCE,
  LOCK_SENTENCE_TO_USER,
} from "../../../lib/server/queries";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  try {
    await connectDb();

    const isExistedData = await FIND_LOCKED_SENTENCE_TO_USER(id);

    console.log({ isExistedData });

    if (isExistedData) {
      return res.json({ data: isExistedData, status: "SUCCESS" });
    }

    if (!isExistedData) {
      const data = await FIND_ONE_SENTENCE(id);
      console.log({ data });

      if (data) {
        const update_lock = await LOCK_SENTENCE_TO_USER(data._id, id);
        console.log({ update_lock });

        if (update_lock.modifiedCount === 1) {
          return res.json({
            data: data,
            status: "SUCCESS",
            message: "successful",
          });
        }
      } else {
        return res.json({ data: "", message: "No unlocked data avalilable" });
      }
    }
  } catch (err) {
    console.log({ err });
  }
}
