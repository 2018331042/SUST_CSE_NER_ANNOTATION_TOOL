import { Select, Table } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import AdminNavbar from "../../components/adminNavbar";
import Page from "../../components/page";

const fetcher = (url) => fetch(url).then((res) => res.json());
const AnnotatorStats = () => {
  const [dailyData, setDailyData] = useState([]);
  const [overAllData, setOverAllData] = useState([]);
  const { data, error } = useSWR("/api/auth/get-annotators", fetcher, {
    refreshInterval: 1000,
  });
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const selectData = data.annotators.map((annotator) => {
    return {
      value: annotator._id,
      label: annotator.name,
    };
  });

  const getStats = async (id: String) => {
    const response = await axios.post("/api/stats/get-annotator-stats", { id });
    console.log({ response });
    setDailyData(response.data.dailyData);
    setOverAllData(response.data.overAllData);
  };

  const dailyRows = dailyData.map((e: any) => (
    <tr>
      <td>{e.Date}</td>
      <td>{e.sentences}</td>
      <td>{e.words}</td>
    </tr>
  ));
  return (
    <Page>
      <AdminNavbar>
        <Select
          data={selectData}
          searchable
          withAsterisk
          label="Select Annotator to view overall and daily stats"
          placeholder="Select annotator"
          onChange={(value) => getStats(value)}
        ></Select>
        <Table withBorder withColumnBorders>
          <thead>
            <tr>
              <th>Date</th>
              <th>Completed Sentences</th>
              <th>Completed Words</th>
            </tr>
          </thead>
          <tbody>{dailyRows}</tbody>
        </Table>
      </AdminNavbar>
    </Page>
  );
};

export default AnnotatorStats;
