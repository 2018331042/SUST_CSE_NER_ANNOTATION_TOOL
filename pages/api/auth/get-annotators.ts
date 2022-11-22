import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import User from "../../../lib/models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hello");

  await connectDb();
  try {
    const annotators = await User.find({ role: "annotator" });
    res.json({ annotators });
  } catch (err) {
    console.log({ err });

    res.json({ err });
  }
}
