import { Button, Collapse } from "@mantine/core";
import React, { useState } from "react";
import AnnotatorNavbar from "../components/annotatorNavbar";
import Page from "../components/page";

const Instructions = () => {
  const [opened, setOpened] = useState(false);
  return (
    <Page>
      <AnnotatorNavbar>Instructions</AnnotatorNavbar>
    </Page>
  );
};

export default Instructions;
