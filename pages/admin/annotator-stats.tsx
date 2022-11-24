import { Button, Select, Table } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import AdminNavbar from "../../components/adminNavbar";
import Page from "../../components/page";
import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";
import LoaderBar from "../../components/loaderbar";

const fetcher = (url) => fetch(url).then((res) => res.json());
const AnnotatorStats = () => {
  const [dailyData, setDailyData] = useState([]);
  const [overAllData, setOverAllData] = useState([]);
  const [annotatorName, setAnnotatorName] = useState("");
  const { data, error } = useSWR("/api/auth/get-annotators", fetcher);
  if (error) return <div>Failed to load</div>;

  const selectData = data?.annotators.map((annotator) => {
    return {
      value: annotator._id,
      label: annotator.name,
    };
  });

  const getStats = async (id: String) => {
    const selectedAnnotator = data.annotators.filter(
      (annotator) => annotator._id === id
    );
    setAnnotatorName(selectedAnnotator[0].name);
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

  const handleExportExcel = async () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(dailyData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `${annotatorName}` + fileExtension);
  };
  return (
    <AdminNavbar>
      {!data ? (
        <LoaderBar />
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "2rem" }}>
            <Select
              data={selectData}
              searchable
              withAsterisk
              label="Select Annotator to view overall and daily stats"
              placeholder="Select annotator"
              onChange={(value) => getStats(value)}
            ></Select>
            <Button onClick={handleExportExcel}>Export to Excel</Button>
          </div>
          <div style={{ marginTop: "2rem" }}>
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
          </div>
        </div>
      )}
    </AdminNavbar>
  );
};

export default AnnotatorStats;
