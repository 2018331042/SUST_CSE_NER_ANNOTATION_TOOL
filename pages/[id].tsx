import { NextPage } from "next";
import React from "react";
import Page from "../components/page";
import { Table } from "@mantine/core";
import AnnotatorNavbar from "../components/annotatorNavbar";
import Dataset from "../lib/models/dataset";
import { Edit } from "tabler-icons-react";
import { useRouter } from "next/router";
const AnnotatedData = ({ taggedSentences }) => {
  const router = useRouter();

  const rows = taggedSentences.map((taggedSentence: any, idx) => (
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
    <Page>
      <AnnotatorNavbar>
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
      </AnnotatorNavbar>
    </Page>
  );
};

export default AnnotatedData;

export async function getServerSideProps(ctx: any) {
  const userId = ctx.query.id;
  // console.log({ userId });

  const taggedSentence = await Dataset.find({
    user_id: userId,
    isAnnotated: true,
  });
  console.log({ taggedSentence });

  const result = taggedSentence.map((tag: any) => {
    return {
      id: tag._id.toString(),
      sentence: tag.sentence,
      tags: tag.tag_sentence,
    };
  });

  return {
    props: {
      taggedSentences: result,
    },
  };
}
