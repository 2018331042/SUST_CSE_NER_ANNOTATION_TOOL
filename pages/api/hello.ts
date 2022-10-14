// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client, INSERT_USER_ONE } from "../../lib/server/graphql";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, name } = req.body;

  const response = client.mutate({
    mutation: INSERT_USER_ONE,
    variables: {
      email,
      name,
    },
  });
  console.log({ response });
  res.status(200).json({ name: "John Doe" });
}
