import { NextPage } from "next";
import React from "react";
import Page from "../components/page";
import { Table } from "@mantine/core";
import AnnotatorNavbar from "../components/annotatorNavbar";
import Dataset from "../lib/models/dataset";

const AnnotatedData = ({ taggedSentences }) => {
  console.log({ taggedSentences });

  const rows = taggedSentences.map((taggedSentence: any) => (
    <tr>
      <td>{taggedSentence.sentence}</td>
      <td>{JSON.stringify(taggedSentence.tags, null, 6)}</td>
    </tr>
  ));

  return (
    <Page>
      <AnnotatorNavbar>
        <Table withColumnBorders highlightOnHover withBorder>
          <thead>
            <tr>
              <th>Sentence</th>
              <th>Tags</th>
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
  console.log({ ctx });

  const userId = ctx.query.id;
  // console.log({ userId });

  const taggedSentence = await Dataset.find({
    user_id: userId,
    isAnnotated: true,
  });
  const result = taggedSentence.map((tag: any) => {
    return {
      sentence: tag.sentence,
      tags: tag.tag_sentence,
    };
  });
  console.log({ result });

  return {
    props: {
      taggedSentences: result,
    },
  };
}
