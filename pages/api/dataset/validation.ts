import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sen_id, serial_no, numberOfTagWords, user_id, tags, sentence } =
    req.body;

  console.log({ sen_id, sentence, serial_no, numberOfTagWords, user_id, tags });

  await connectDb();

  try {
  } catch (err) {
    console.log({ err });
    res.json({ status: "error", message: "some error occured" });
  }
}
