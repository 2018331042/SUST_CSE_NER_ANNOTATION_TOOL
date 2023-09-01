import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import Dataset from "../../../lib/models/dataset";
import Validate from "../../../lib/models/validate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sen_id, serial_no, numberOfTagWords, user_id, tags, sentence } =
    req.body;

  console.log({ sen_id, sentence, serial_no, numberOfTagWords, user_id, tags });

  await connectDb();

  try {
    const result = await Dataset.findOne({ isValidated: false });
    const update = await Dataset.updateOne(
      { _id: sen_id, isValidated: false },
      { $set: { isValidated: true } }
    );

    console.log({ update });

    const validate = new Validate({
      serial_no: serial_no,
      sentence: sentence,
      tag_sentence: tags,
      numberOfTagWords: numberOfTagWords,
      user_id: user_id,
    });
    console.log({ validate });

    const updateValidate = await validate.save();
    console.log({ updateValidate });

    res.json({ status: "success", message: "data saved" });
  } catch (err) {
    console.log({ err });
    res.json({ status: "error", message: "some error occured" });
  }
}
