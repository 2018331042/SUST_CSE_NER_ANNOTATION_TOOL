import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import Dataset from "../../../lib/models/dataset";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();

  try {
    const findSentence = await Dataset.findOne({
      isAnnotated: true,
      isValidated: false,
    });

    console.log({ findSentence });

    res.json({ status: "success", data: findSentence });
  } catch (err) {
    console.log({ err });
    res.json({ status: "error", message: "sone error occured" });
  }
}
