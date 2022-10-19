import { NextPage } from "next";
import React from "react";
import Page from "../components/page";
import { Table } from "@mantine/core";
import AnnotatorNavbar from "../components/annotatorNavbar";

const elements = [
  {
    sentence: "Fahim sust",
    tags: {
      PER: "Fahim",
      ORG: "sust",
      PER1: "Fahim",
      PER2: "Fahim",
      PER3: "Fahim",
      PER4: "Fahim",
      PER5: "Fahim",
      PER6: "Fahim",
      PER7: "Fahim",
    },
  },
  { sentence: "Fahim sust", tags: { PER: "Fahim", ORG: "sust" } },
  { sentence: "Fahim sust", tags: { PER: "Fahim", ORG: "sust" } },
];

const AnnotatedData: NextPage = () => {
  const rows = elements.map((element) => (
    <tr>
      <td>{element.sentence}</td>
      <td>{JSON.stringify(element.tags, null, 6)}</td>
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
