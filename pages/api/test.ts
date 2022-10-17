import readlineiter from "readlineiter";
import { client, INSERT_DATASETS } from "../../lib/server/graphql";
export default async function handler(req, res) {
  const lineIterator = readlineiter("input.txt");
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
        const resp = await client.mutate({
          mutation: INSERT_DATASETS,
          variables: {
            sentence: line,
          },
        });

        console.log({ resp: resp.data });
      } catch (err) {
        console.log({ err });
      }
    }
  })();
}
