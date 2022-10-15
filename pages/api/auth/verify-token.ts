import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { client, GET_USER } from "../../../lib/server/graphql";
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
    const data = jwt.verify(
      token,
      process.env.HASURA_GRAPHQL_JWT_SECRET
    ) as jwtPayload;
    console.log({ data });
    const response = await client.query({
      query: GET_USER,
      variables: {
        id: data.id,
      },
    });

    if (
      !(
        response.data.users_by_pk.session_token ===
        data["https://hasura.io/jwt/claims"]["x-hasura-session-token"]
      )
    ) {
      throw new Error();
    }
    res.status(200).json({
      status: "success",
      message: "user found",
      data: response.data.users_by_pk,
      isVerified: true,
    });
  } catch (err) {
    res.status(200).json({
      status: "failed",
      message: err,
      data: {},
      isVerified: false,
    });
  }
}
