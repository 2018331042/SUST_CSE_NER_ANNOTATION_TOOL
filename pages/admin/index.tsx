import {
  Badge,
  Button,
  NumberInput,
  Pagination,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Edit } from "tabler-icons-react";
import AdminNavbar from "../../components/adminNavbar";
import Page from "../../components/page";
import connectDb from "../../lib/db";
import Dataset from "../../lib/models/dataset";
import Stats from "../../lib/models/stats";
import {
  GET_ANNOTATED_DATA_AND_USER_INFO,
  GET_STATS_TABLE_INFO,
} from "../../lib/server/queries";

const Admin = ({ data, numberOfAnnotated, numberOfUnAnnotated }) => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [tagSentences, setTagSentences] = useState(data);
  const [activePage, setActivePage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(20);
  const router = useRouter();
  const indexOfLastData = activePage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  // const currentTagSentences = tagSentences.slice(
  //   indexOfFirstData,
  //   indexOfLastData
  // );

  // const rows = currentTagSentences.map((element) => (
  //   <tr key={element.serial_no}>
  //     <td>{element.serial_no}</td>
  //     <td>{element.sentence}</td>
  //     <td>{JSON.stringify(element.tags, null, 6)}</td>
  //     <td>{element.timestamp}</td>
  //     <td>
  //       <Link href={`/admin/${element.user_id}`} passHref>
  //         {element.username}
  //       </Link>
  //     </td>
  //     <td>
  //       {" "}
  //       <Edit onClick={() => router.push(`/${element.id}/edit`)} />
  //     </td>
  //   </tr>
  // ));

  const rows = data.map((element) => (
    <tr key={element._id}>
      <td>{element.username}</td>
      <td>{element.current_sentence}</td>
      <td>{element.current_words}</td>
    </tr>
  ));

  const handlerSearch = () => {
    if (fromValue === undefined || toValue === undefined) {
      setTagSentences(data);
      return;
    }
    if (fromValue !== 0 && toValue !== 0) {
      const filterdAnnotatedData = data.filter(
        (e) => e.serial_no >= fromValue && e.serial_no <= toValue
      );

      setTagSentences(filterdAnnotatedData);
    }
  };

  return (
    <AdminNavbar>
      <div>
        <div
          style={{
            border: "1px solid black",
            backgroundColor: "lightgray",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "2rem",
          }}
        >
          <div>Total Annotated Data - {numberOfAnnotated}</div>
          <div>Total Unannotated Data - {numberOfUnAnnotated}</div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div>
              <Text>Filter</Text>
            </div>
            <div style={{ width: "5rem" }}>
              <NumberInput
                hideControls
                placeholder="From"
                onChange={(val) => setFromValue(val)}
              />
            </div>
            <div style={{ width: "5rem" }}>
              <NumberInput
                hideControls
                placeholder="To"
                onChange={(val) => setToValue(val)}
              />
            </div>
            <Button onClick={handlerSearch}>Search</Button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <Badge
            style={{ width: "300px", marginTop: "2rem" }}
            color="teal"
            size="xl"
          >
            Leaderboard
          </Badge>
          <Table withColumnBorders highlightOnHover withBorder>
            <thead>
              <tr>
                <th> Annotator's Name</th>
                <th> Total Completed Sentences</th>
                <th> Total Completed Words</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          {/* <LeaderboardTable data={tagSentences} /> */}
        </div>
        {/* <div style={{ display: "flex", flexDirection: "column" }}>
          <Table withColumnBorders withBorder>
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Sentence</th>
                <th>Tags</th>
                <th>Date</th>
                <th>Annotator</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <Pagination
            style={{ alignSelf: "center", padding: "1rem" }}
            page={activePage}
            onChange={setActivePage}
            total={tagSentences.length / dataPerPage}
          />
        </div> */}
      </div>
    </AdminNavbar>
  );
};

// function LeaderboardTable({ get_user_stat_info }) {
//   // const rows = data.map((row) => (
//   //   <tr key={row._id}>
//   //     <td>{row.user[0].name}</td>
//   //     <td>{row.total_completed_words}</td>
//   //     <td>{row.total_completed_sentences}</td>
//   //   </tr>
//   // ));

//   return (
//     <Table withColumnBorders highlightOnHover withBorder>
//       <thead>
//         <tr>
//           <th>Annotator's Name</th>
//           <th>Total Completed Words</th>
//           <th>Total Completed Sentences</th>
//         </tr>
//       </thead>
//       {/* <tbody>{rows}</tbody> */}
//     </Table>
//   );
// }

export default Admin;

export async function getServerSideProps() {
  await connectDb();
  // const annotatedData = await GET_ANNOTATED_DATA_AND_USER_INFO();

  const get_user_stat_info = await GET_STATS_TABLE_INFO();

  const data = get_user_stat_info.map((e) => {
    return {
      id: e._id.toString(),
      current_words: e.current_words,
      current_sentence: e.current_sentence,
      username: e.user[0].name,
    };
  });

  const numberOfAnnotated = await Dataset.find({
    lock: true,
    isAnnotated: true,
  }).count();
  const numberOfUnAnnotated = await Dataset.find({
    lock: false,
    isAnnotated: false,
  }).count();

  return {
    props: {
      numberOfAnnotated,
      numberOfUnAnnotated,
      data,
    },
  };
}
