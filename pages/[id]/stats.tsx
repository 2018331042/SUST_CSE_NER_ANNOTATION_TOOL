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
      <td>{element.dailyWords}</td>
      <td>{element.dailySentences}</td>
      <td>{element.weeklyWords}</td>
      <td>{element.weeklySentences}</td>
    </tr>
  ));
  return (
    <Page>
      <AnnotatorNavbar>
        <Table withColumnBorders highlightOnHover withBorder>
          <thead>
            <tr>
              <th> Total Completed Words</th>
              <th> Total Completed Sentences</th>
              <th>words / daily</th>
              <th>sentences / daily</th>
              <th>words / weekly</th>
              <th>sentences / weekly</th>
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
        weeklyWords: e.weekly_words,
        weeklySentences: e.weekly_sentence,
      };
    });
    return {
      props: { data },
    };
  } catch (err) {
    console.log({ err });
  }
}
