import readlineiter from "readlineiter";
import connectDb from "../../lib/db";
import Stats from "../../lib/models/stats";
import { FIND_ONE_SENTENCE } from "../../lib/server/queries";
export default async function handler(req, res) {
  // const { id, numberOfWords } = req.body; 
  // await connectDb();

  res.json({ status: "ok" });
}
