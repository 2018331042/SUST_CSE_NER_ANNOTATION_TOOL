import connectDb from "../../../lib/db";
import User from "../../../lib/models/user";

export default async function handler(req, res) {
  const { values } = req.body;
  await connectDb();

  try {
    const newAnnotator = new User({
      email: values.email,
      name: values.name,
      password: values.password,
      role: values.role,
    });
    const annotator = await newAnnotator.save();
    res.json({ annotator });
  } catch (err) {
    console.log({ err });
    res.json({ err });
  }
}
