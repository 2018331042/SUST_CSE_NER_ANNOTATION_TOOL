import { NextApiRequest, NextApiResponse } from "next";
import { client, GET_USER_BY_EMAIL } from "../../../lib/server/graphql";
import createToken from "../token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  try {
    const result = await client.query({
      query: GET_USER_BY_EMAIL,
      variables: {
        email,
      },
    });

    console.log({ result: result.data.users });

    if (result) {
      if (result.data.users[0].password === password) {
        const { name, role, id } = result.data.users[0];
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
