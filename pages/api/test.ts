import connectDb from "../../lib/db";
import Dataset from "../../lib/models/dataset";
import User from "../../lib/models/user";
import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";
export default async function handler(req, res) {
  await connectDb();

  try {
    const users = await User.find({});
    const dataset = await Dataset.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$timestamp" },
            year: { $year: "$timestamp" },
            user_id: "$user_id",
          },
          total: { $sum: "$numberOfTagWords" },
        },
      },
    ]);

    let information = [];
    users.map((user) => {
      let totalTagwords = 0;
      dataset.map((datam) => {
        console.log({ words: user._id.toString() });
        if (datam._id.user_id === user._id.toString()) {
          if (datam._id.year === 2023 && datam._id.month >= 5)
            totalTagwords = datam.total + totalTagwords;
        }
      });
      information.push({
        name: user.name,
        total_words: totalTagwords,
        Amount: Math.floor((500 * totalTagwords) / 3000),
      });
    });
    res.json({ information });
  } catch (err) {
    console.log({ err });
    res.json({ err });
  }
}
