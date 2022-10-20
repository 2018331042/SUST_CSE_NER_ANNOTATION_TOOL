import { NextPage } from "next";
import React from "react";
import mongoose from "mongoose";
import Page from "../../components/page";
import { Button, Table } from "@mantine/core";
import Dataset from "../../lib/models/dataset";
import { useRouter } from "next/router";

const AnnotatedData = ({ taggedSentences }) => {
  const router = useRouter();

  const rows = taggedSentences.map((taggedSentence: any) => (
    <tr>
      <td>{taggedSentence.sentence}</td>
      <td>{JSON.stringify(taggedSentence.tags, null, 6)}</td>
    </tr>
  ));

  return (
    <Page>
      <div style={{ marginBottom: "2rem" }}>
        <Button onClick={() => router.push("/admin")}>Back To Home</Button>
      </div>
      <Table withColumnBorders highlightOnHover withBorder>
        <thead>
          <tr>
            <th>Sentence</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Page>
  );
};

export default AnnotatedData;

export async function getServerSideProps(ctx: any) {
  const userId = ctx.query.id;
  console.log({ userId });

  const taggedSentence = await Dataset.find({
    user_id: userId,
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
