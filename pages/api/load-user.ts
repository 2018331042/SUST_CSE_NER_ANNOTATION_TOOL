import connectDb from "../../lib/db";
import Stats from "../../lib/models/stats";
import User from "../../lib/models/user";

export default async function handler(req, res) {
  const { values } = req.body;
  console.log({ values });

  try {
    await connectDb();
    const newUser = new User({
      email: values.email,
      name: values.name,
      password: values.password,
      role: "annotator",
    });
    const user = await newUser.save();
    const newStats = new Stats({ user_id: user._id });
    const stats = await newStats.save();
    res.json({ user, stats });
  } catch (err) {
    console.log({ err });

    res.json({ err });
  }
}
