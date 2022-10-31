import readlineiter from "readlineiter";
import connectDb from "../../lib/db";
import { FIND_ONE_SENTENCE } from "../../lib/server/queries";
export default async function handler(req, res) {
  await connectDb();
  try {
    const response = await FIND_ONE_SENTENCE();
    res.json({ response });
  } catch (err) {
    res.json({ err });
  }
}
