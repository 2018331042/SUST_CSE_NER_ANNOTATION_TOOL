import connectDb from "../../lib/db";
import User from "../../lib/models/user";

export default async function handler(req, res) {
  const { email, name, password, role } = req.body;

  try {
    await connectDb();
    const newUser = new User({
      email,
      name,
      password,
      role,
    });
    const user = await newUser.save();
    res.json({ user });
  } catch (err) {
    console.log({ err });

    res.json({ err });
  }
}
