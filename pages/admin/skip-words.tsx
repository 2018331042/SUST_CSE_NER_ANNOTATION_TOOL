import { Table } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { Edit } from "tabler-icons-react";
import AdminNavbar from "../../components/adminNavbar";
import Page from "../../components/page";
import connectDb from "../../lib/db";
import Dataset from "../../lib/models/dataset";

const Skip = ({ data }) => {
  const router = useRouter();

  const rows = data.map((taggedSentence: any, idx: any) => (
    <tr>
      <td>{idx + 1}</td>
      <td>{taggedSentence.sentence}</td>
      <td>{JSON.stringify(taggedSentence.tags, null, 6)}</td>
      <td onClick={() => router.push(`/${taggedSentence.id}/edit`)}>
        {" "}
        <Edit />{" "}
      </td>
    </tr>
  ));
  return (
    <AdminNavbar>
      <Table withColumnBorders highlightOnHover withBorder>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Sentence</th>
            <th>Tags</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </AdminNavbar>
  );
};

export default Skip;

export async function getServerSideProps(ctx: any) {
  await connectDb();
  let data;
  try {
    const response = await Dataset.find({ isSkipped: true });
    console.log({ response });
    data = response.map((e) => {
      return {
        id: e._id.toString(),
        sentence: e.sentence,
        tags: e.tag_sentence,
      };
    });
    console.log({ data });
  } catch (err) {
    console.log({ err });
  }

  return {
    props: {
      data,
    },
  };
}
