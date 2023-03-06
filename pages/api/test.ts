import readlineiter from "readlineiter";
import connectDb from "../../lib/db";
import Dataset from "../../lib/models/dataset";
import Stats from "../../lib/models/stats";
import { FIND_ANNOTATORS, FIND_ONE_SENTENCE, GET_STATS_TABLE_INFO } from "../../lib/server/queries";
import jsonfile from 'jsonfile';

export default async function handler(req, res) {
  // const { id, numberOfWords } = req.body;
  await connectDb();
  try {
    // const newStats = new Stats({ user_id: id });
    // const stats = await newStats.save();

    // const annotators = await FIND_ANNOTATORS();
    // console.log(annotators);
    // res.json({ annotators });

    // const stats = await GET_STATS_TABLE_INFO();
    // stats.map( (stat) => console.log(stat.current_words, stat.current_sentence, stat.user[0].name))
    // res.json({stats})

    const data = await Dataset.aggregate([
      { $match: { isSkipped: false, isAnnotated: true } },
      { $limit: 12000 },
    ]);
    let object = [];

    const jsonl = data.map((e) => {
      return {
        tokens: Object.keys(e.tag_sentence),
        tags: Object.values(e.tag_sentence) 
      }
    })

    //**converting tag sentences to a json object */
    // data.map((e) => {
    //   for (const [key, value] of Object.entries(e.tag_sentence)) {
    //     object.push({
    //       sentence: e.sentence,
    //       words: key,
    //       labels: value,
    //     });
    //   }
    // });
    // console.log({ finetuned });
    // res.json({ object });

    
    jsonfile.writeFile('jsonl.json', jsonl, function(err, success){
      if(err) return res.json({err});

      res.json({success:"success"})
    })

    // res.json({jsonl})

  } catch (err) {
    res.json({ err });
  }
}
