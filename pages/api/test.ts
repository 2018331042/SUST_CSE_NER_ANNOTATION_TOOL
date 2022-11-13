import readlineiter from "readlineiter";
import connectDb from "../../lib/db";
import Stats from "../../lib/models/stats";
import { FIND_ONE_SENTENCE } from "../../lib/server/queries";
export default async function handler(req, res) {
  const { id, numberOfWords } = req.body;
  await connectDb();
  try {
    const newStats = new Stats({ user_id: id });
    const stats = await newStats.save();

    res.json({ stats });
  } catch (err) {
    res.json({ err });
  }
  res.json({ status: "ok" });
}
