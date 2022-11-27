import { Badge, Button, Table } from "@mantine/core";
import React from "react";
import AnnotatorNavbar from "../../components/annotatorNavbar";
import Dataset from "../../lib/models/dataset";
import Stats from "../../lib/models/stats";

const MyStats = ({ dailyData, overAllData }) => {
  const overAllRows = overAllData.map((element: any) => (
    <tr key={element.serial_no}>
      <td>{element.totalWords}</td>
      <td>{element.totalSentences}</td>
    </tr>
  ));
  const dailyRows = dailyData.map((element: any) => (
    <tr key={element.serial_no}>
      <td>{element.Date}</td>
      <td>{element.sentences}</td>
      <td>{element.words}</td>
    </tr>
  ));
  return (
    <AnnotatorNavbar>
      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <Badge style={{ width: "300px" }} color="teal" size="xl">
            Overall Statistics
          </Badge>
          <Table withColumnBorders highlightOnHover withBorder>
            <thead>
              <tr>
                <th> Total Completed Words</th>
                <th> Total Completed Sentences</th>
              </tr>
            </thead>
            <tbody>{overAllRows}</tbody>
          </Table>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <Badge style={{ width: "300px" }} color="teal" size="xl">
            Daily Statistics
          </Badge>
          <Table withColumnBorders highlightOnHover withBorder>
            <thead>
              <tr>
                <th>Date</th>
                <th>Completed Sentences</th>
                <th>Completed Words</th>
              </tr>
            </thead>
            <tbody>{dailyRows}</tbody>
          </Table>
        </div>
      </div>
    </AnnotatorNavbar>
  );
};

export default MyStats;

export async function getServerSideProps(ctx: any) {
  const { id } = ctx.query;
  console.log({ id });
  try {
    const dailyData = await Dataset.aggregate([
      { $match: { isAnnotated: true, user_id: id } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          count: { $sum: 1 },
          numberOfWords: { $sum: "$numberOfTagWords" },
        },
      },
      {
        $project: {
          _id: 0,
          Date: "$_id",
          sentences: "$count",
          words: "$numberOfWords",
        },
      },
    ]);
    console.log({ dailyData });

    const findStats = await Stats.find({ user_id: id });
    console.log({ findStats });
    const overAllData = findStats.map((e) => {
      return {
        totalWords: e.current_words,
        totalSentences: e.current_sentence,
      };
    });
    console.log({ overAllData });

    return {
      props: {
        dailyData,
        overAllData,
      },
    };
  } catch (err) {
    console.log({ err });
  }
}
