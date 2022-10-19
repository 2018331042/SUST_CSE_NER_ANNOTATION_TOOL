import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import User from "../../../lib/models/user";
import { client, GET_USER_BY_EMAIL } from "../../../lib/server/graphql";
import createToken from "../token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  try {
    await connectDb();
    const user = await User.findOne({email});

    console.log({ id: user._id });
    const id = user._id.toString();
    console.log({id});

    if (user) {
      if (user.password === password) {
        const { name, role } = user;
        const token = createToken(role, id, email);
        console.log(`token: ${token}`);

        res.json({
          data: { email, name, role, id, token },
          status: "SUCCESS",
          message: "user Found",
        });
      } else {
        res.json({ status: "FAILED", message: "email or password error" });
      }
    } else {
      res.json({ status: "FAILED", message: "user not found" });
    }
  } catch (err) {
    console.log({ err });
  }
}
