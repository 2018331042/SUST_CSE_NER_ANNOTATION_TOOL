import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import User from "../../../lib/models/user";
import createToken from "../token";
import cookie from "cookie";
import bcrypt from "bcryptjs";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  try {
    await connectDb();
    const user = await User.findOne({ email });

    if (user) {
      const id = user._id.toString();
      if (bcrypt.compareSync(password, user.password)) {
        if (user.isActive === true) {
          const { name, role } = user;
          const token = createToken(role, id, email);
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
              httpOnly: false,
              secure: true, //process.env.NODE_ENV !== "development",
              maxAge: 60 * 60 * 360,
              sameSite: "strict",
              path: "/",
            })
          );
          res.setHeader("Access-Control-Allow-Credentials", true);

          res.json({
            data: { email, name, role, id, token },
            status: "SUCCESS",
            message: "Login Successful",
          });
        } else {
          return res.json({
            status: "FAILED",
            message:
              "Your Account is not active. Please contact with the admin.",
          });
        }
      } else {
        return res.json({
          status: "FAILED",
          message: "Email or Password error",
        });
      }
    } else {
      return res.json({ status: "FAILED", message: "Email or Password error" });
    }
  } catch (err) {
    console.log({ err });
  }
}
