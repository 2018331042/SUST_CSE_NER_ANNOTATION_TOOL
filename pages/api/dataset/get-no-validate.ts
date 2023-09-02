import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import Dataset from "../../../lib/models/dataset";
import {
  FIND_LOCKED_INVALIDATE_SENTENCE_TO_USER,
  FIND_ONE_INVALIDATE_SENTENCE,
  LOCK_INVALIDATE_SENTENCE_TO_USER,
} from "../../../lib/server/queries";
import jwt from "jsonwebtoken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();

  const { token } = req.body;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const isExistedData = await FIND_LOCKED_INVALIDATE_SENTENCE_TO_USER(id);

    if (isExistedData) {
      return res.json({ data: isExistedData, status: "SUCCESS" });
    }
    const data = await FIND_ONE_INVALIDATE_SENTENCE();
    console.log({ data });

    if (data) {
      const update_lock = await LOCK_INVALIDATE_SENTENCE_TO_USER(data._id, id);
      console.log({ update_lock });

      if (update_lock.modifiedCount === 1) {
        return res.json({
          data: data,
          status: "SUCCESS",
          message: "successful",
        });
      }
    } else {
      return res.json({
        status: "warning",
        data: "",
        message: "No invalid data avalilable",
      });
    }
  } catch (err) {
    console.log({ err });
    res.json({ status: "error", message: "sone error occured" });
  }
}
