import connectDb from "../../../lib/db";
import User from "../../../lib/models/user";

export default async function handler(req, res) {
  await connectDb();
  try {
    const annotators = await User.find({ role: "annotator" });
    res.json({ annotators });
  } catch (err) {
    console.log({ err });

    res.json({ err });
  }
}
