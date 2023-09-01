import connectDb from "../../lib/db";
import Dataset from "../../lib/models/dataset";

export default async function handler(req, res) {
  await connectDb();
  try {
    const res = await Dataset.updateMany({}, { $set: { isValidated: false } });
    console.log({ res });

    console.log("All data is now unvalidated");
  } catch (err) {
    console.log({ err });
    res.json({ status: "error", message: err });
  }

  res.json({ status: "success", message: "All data is now unvalidated" });
}
