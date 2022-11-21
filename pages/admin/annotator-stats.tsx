import { Table } from "@mantine/core";
import React from "react";
import AdminNavbar from "../../components/adminNavbar";
import Page from "../../components/page";
import { GET_ALL_USER_ANNOTATION_STATS } from "../../lib/server/queries";

const AnnotatorStats = ({ data }) => {
  const rows = data.map((e: any, idx: any) => (
    <tr>
      <td>{idx + 1}</td>
      <td>{e.username}</td>
      <td>{e.current_words}</td>
      <td>{e.current_sentence}</td>
      <td>{e.daily_words}</td>
      <td>{e.daily_sentence}</td>
      <td>{e.weekly_words}</td>
      <td>{e.weekly_sentence}</td>
    </tr>
  ));
  return (
    <Page>
      <AdminNavbar>
        <Table withBorder withColumnBorders>
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Name</th>
              <th>Total Completed Words</th>
              <th>Total Completed Sentences</th>
              <th>words/daily</th>
              <th>sentences/daily</th>
              <th>words/weekly</th>
              <th>sentences/weekly</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </AdminNavbar>
    </Page>
  );
};

export default AnnotatorStats;

export async function getServerSideProps(ctx: any) {
  const allStats = await GET_ALL_USER_ANNOTATION_STATS();
  console.log(allStats[0].user);
  const data = allStats.map((e) => {
    return {
      current_words: e.current_words,
      current_sentence: e.current_sentence,
      username: e.user[0].name,
    };
  });
  console.log({ data });

  return {
    props: {
      data,
    },
  };
}
