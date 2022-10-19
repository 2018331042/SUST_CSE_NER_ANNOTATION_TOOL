// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../lib/db";
import User from "../../lib/models/user";
import { client, INSERT_USER_ONE } from "../../lib/server/graphql";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, name, password, role } = req.body;
  try {
    console.log("CONNECTING MONGO");

    await connectDb();
    console.log("CONNECTED MONGO");

    const newUser = new User({
      email,
      name,
      password,
      role,
    });
    const user = await newUser.save();
    res.json({ message: "User created successfully" });
  } catch (err) {
    console.log({ err });
  }
}
