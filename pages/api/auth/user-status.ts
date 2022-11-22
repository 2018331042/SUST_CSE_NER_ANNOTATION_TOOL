import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import User from "../../../lib/models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isActive, id } = req.body;
  console.log({ isActive, id });

  try {
    await connectDb();
    const result = await User.updateOne(
      { _id: id },
      { $set: { isActive: !isActive } }
    );

    console.log({ result });
    if (result.modifiedCount === 1) {
      res.json({ status: "Success", message: "Action Successful" });
    }
  } catch (err) {
    res.json({ err });
    console.log({ err });
  }
}
