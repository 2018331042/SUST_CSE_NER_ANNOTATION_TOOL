import { Button, NumberInput, Table, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Edit } from "tabler-icons-react";
import AdminNavbar from "../../components/adminNavbar";
import Page from "../../components/page";
import connectDb from "../../lib/db";
import Dataset from "../../lib/models/dataset";
import { GET_ANNOTATED_DATA_AND_USER_INFO } from "../../lib/server/queries";

const Admin = ({ data, numberOfAnnotated, numberOfUnAnnotated }) => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [tagSentences, setTagSentences] = useState(data);
  const router = useRouter();
  console.log({ data });

  const rows = tagSentences.map((element) => (
    <tr key={element.serial_no}>
      <td>{element.serial_no}</td>
      <td>{element.sentence}</td>
      <td>{JSON.stringify(element.tags, null, 6)}</td>
      <td>{element.timestamp}</td>
      <td>
        <Link href={`/admin/${element.user_id}`} passHref>
          {element.username}
        </Link>
      </td>
      <td>
        {" "}
        <Edit onClick={() => router.push(`/${element.id}/edit`)} />
      </td>
    </tr>
  ));

  const handlerSearch = () => {
    console.log({ fromValue, toValue });
    if (fromValue === undefined || toValue === undefined) {
      setTagSentences(data);
      return;
    }
    if (fromValue !== 0 && toValue !== 0) {
      const filterdAnnotatedData = data.filter(
        (e) => e.serial_no >= fromValue && e.serial_no <= toValue
      );

      console.log({ filterdAnnotatedData });
      setTagSentences(filterdAnnotatedData);
    }
  };

  return (
    <Page>
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
        </div>
      </AdminNavbar>
    </Page>
  );
};

export default Admin;

export async function getServerSideProps() {
  await connectDb();
  const annotatedData = await GET_ANNOTATED_DATA_AND_USER_INFO();
  console.log({ annotatedData });
  const data = annotatedData.map((e) => {
    return {
      id: e._id.toString(),
      serial_no: e.serial_no,
      sentence: e.sentence,
      tags: e.tag_sentence,
      timestamp: e.timestamp.toLocaleDateString(),
      username: e.user[0].name,
      user_id: e.user_id.toString(),
    };
  });

  const numberOfAnnotated = await Dataset.find({
    lock: true,
    isAnnotated: true,
  }).count();
  const numberOfUnAnnotated = await Dataset.find({ lock: false }).count();
  console.log({ numberOfAnnotated });
  console.log({ numberOfUnAnnotated });

  console.log({ data });

  return {
    props: {
      data,
      numberOfAnnotated,
      numberOfUnAnnotated,
    },
  };
}
