import { Table } from "@mantine/core";
import React from "react";
import AnnotatorNavbar from "../../components/annotatorNavbar";
import Page from "../../components/page";
import connectDb from "../../lib/db";
import Stats from "../../lib/models/stats";
const MyStats = ({ data }) => {
  const rows = data.map((element: any) => (
    <tr key={element.serial_no}>
      <td>{element.totalWords}</td>
      <td>{element.totalSentences}</td>
    </tr>
  ));
  return (
    <Page>
      <AnnotatorNavbar>
        <Table withColumnBorders highlightOnHover withBorder>
          <thead>
            <tr>
              <th>Completed Total Words</th>
              <th>Completed Total Sentences</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </AnnotatorNavbar>
    </Page>
  );
};

export default MyStats;

export async function getServerSideProps(ctx: any) {
  const { id } = ctx.query;
  console.log({ id });

  try {
    await connectDb();
    const findStats = await Stats.find({ user_id: id });
    console.log({ findStats });
    const data = findStats.map((e) => {
      return {
        totalWords: e.current_words,
        totalSentences: e.current_sentence,
        dailyWords: e.daily_words,
        dailySentences: e.daily_sentence,
      };
    });
    return {
      props: { data },
    };
  } catch (err) {
    console.log({ err });
  }
}
