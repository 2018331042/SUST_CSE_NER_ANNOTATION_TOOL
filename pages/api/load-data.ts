import { NextApiRequest, NextApiResponse } from "next";
import readlineiter from "readlineiter";
import connectDb from "../../lib/db";
import Dataset from "../../lib/models/dataset";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path } = req.body;
  await connectDb();
  const lineIterator = readlineiter(path);
  // This is the same as:
  // fetchline(
  //   'https://raw.githubusercontent.com/tomchen/fetchline/main/testfile/crlf_finalnewline',
  //   {
  //     includeLastEmptyLine: true,
  //     encoding: 'utf-8',
  //     delimiter: /\r?\n/g,
  //   }
  // )
  (async () => {
    for await (const line of lineIterator) {
      // do something with `line`
      console.log(line);
      try {
        const seq = await Dataset.count();
        console.log({ seq });

        const newData = new Dataset({
          serial_no: seq + 1,
          sentence: line,
        });
        const data = await newData.save();
        //res.json({ message: "Data created successfully" });
      } catch (err) {
        console.log({ err });
      }
    }
  })();

  // const { sentence, tag_sentence } = req.body;
}
