import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import Dataset from "../../../lib/models/dataset";
import jwt from "jsonwebtoken";
import cookie from "cookie";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body;
  // console.log({ token });
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  // console.log({ id });

  try {
    await connectDb();

    const isExistedData = await Dataset.findOne({
      lock: true,
      user_id: id,
      isAnnotated: false,
    });

    console.log({ isExistedData });

    if (isExistedData) {
      return res.json({ data: isExistedData, status: "SUCCESS" });
    }

    if (!isExistedData) {
      const data = await Dataset.findOne({ lock: false }).lean();
      console.log({ data });

      if (data) {
        const update_lock = await Dataset.updateOne(
          { _id: data._id },
          { $set: { lock: true, user_id: id } }
        );
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
