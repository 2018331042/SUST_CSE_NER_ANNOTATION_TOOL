import { Accordion, Button, Collapse } from "@mantine/core";
import React, { useState } from "react";
import AnnotatorNavbar from "../components/annotatorNavbar";
import Page from "../components/page";
import { IconPlus } from "@tabler/icons";

const Instructions = () => {
  const [opened, setOpened] = useState(false);
  return (
    <Page>
      <AnnotatorNavbar>
        <Accordion
          chevron={<IconPlus size={16} />}
          styles={{
            chevron: {
              "&[data-rotate]": {
                transform: "rotate(45deg)",
              },
            },
          }}
        >
          <Accordion.Item value="customization">
            <Accordion.Control>Customization</Accordion.Control>
            <Accordion.Panel>
              Colors, fonts, shadows and many other parts are customizable to
              fit your design needs
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="flexibility">
            <Accordion.Control>Flexibility</Accordion.Control>
            <Accordion.Panel>
              Configure components appearance and behavior with vast amount of
              settings or overwrite any part of component styles
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </AnnotatorNavbar>
    </Page>
  );
};

export default Instructions;
