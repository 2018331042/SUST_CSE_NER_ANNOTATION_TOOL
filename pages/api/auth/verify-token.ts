import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/db";
import User from "../../../lib/models/user";
type Data = {
  status: String;
  message: String;
  data: any;
  isVerified: Boolean;
};
interface jwtPayload {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { token } = req.body;
  console.log("verifying");
  console.log(token);
  try {
    await connectDb();
    const data = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as jwtPayload;
    console.log({ data });
    const user = await User.findById({_id:data.id});

    console.log({user});
    
    if(user){
      res.status(200).json({
        status: "success",
        message: "user found",
        data: user,
        isVerified: true,
      });
    }
   
  } catch (err) {
    res.status(200).json({
      status: "failed",
      message: err,
      data: {},
      isVerified: false,
    });
  }
}
