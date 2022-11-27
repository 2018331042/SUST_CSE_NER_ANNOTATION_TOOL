import { Accordion, Button, Collapse } from "@mantine/core";
import React, { useState } from "react";
import AnnotatorNavbar from "../components/annotatorNavbar";
import Page from "../components/page";
import { IconPlus } from "@tabler/icons";

const Instructions = () => {
  const [opened, setOpened] = useState(false);
  return (
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
        transitionDuration={1000}
      >
        <Accordion.Item value="1">
          <Accordion.Control>Tag Description</Accordion.Control>
          <Accordion.Panel>
            <div>
              <b>B-Per:</b> The word is the name of a person. If there are
              multiple words that represent a single person, the first word will
              be tagged as <b>"B-Per"</b>. If the name consists of only one
              word, it will be tagged as <b>"B-Per"</b>.
            </div>
            <div>
              <b>I-Per:</b> All the words in a person's name, except the first
              and the last one will be tagged as<b>"I-Per"</b>.
            </div>
            <div>
              <b>E-Per:</b> The last word in a person's name.
            </div>
            <div>
              {" "}
              <b>B-Org:</b> The first word in the name of an
              organization/instituition.
            </div>
            <div>
              <b>I-Org:</b> All words except the first and the last one in the
              name of an organization/instituition.
            </div>
            <div>
              <b>E-Org:</b> The last word in the name of an
              organization/institution.
            </div>
            <div>
              <b>Loc:</b> The word represents a location or a physical place.
            </div>
            <div>
              <b>Time:</b> The word specifies a time/event.
            </div>
            <div>
              <b>Object:</b> The name of a thing or any object.
            </div>
            <div>
              <b>Others:</b> This word does not belong to any Name Entity group.
            </div>
            <div>
              <b>Skip:</b> If you don’t know the appropriate tag for a word, you
              can skip the word by tagging 'skip'. The sentences that have
              skipped words will be stored on the "skipped sentences" section.
              Skipped sentences can be further tagged by anyone.
            </div>
            <div>
              <b>Garbage:</b> If there is a word that is misspelled or does not
              make sense, the tag will be 'garbage'.
            </div>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="2">
          <Accordion.Control>
            Why the "Next" button is disabled in the annotation?
          </Accordion.Control>
          <Accordion.Panel>
            The "Next" button will be enabled only after all the words in a
            sentence have been assigned to a tag. Once a sentence is completed,
            you will be directed to a new sentence.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="3">
          <Accordion.Control>Can I skip an entire sentence?</Accordion.Control>
          <Accordion.Panel>
            Yes, whole sentences can be skipped by pressing the 'Skip' button at
            the bottom of the words list.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="4">
          <Accordion.Control>
            What if I don’t know the tag for a word?
          </Accordion.Control>
          <Accordion.Panel>
            You can just skip the word by tagging it as 'skip' for the time
            being.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="5">
          <Accordion.Control>
            Can I edit the tags if I think I made a mistake in the previous
            sentences?
          </Accordion.Control>
          <Accordion.Panel>
            You can always go to the "Annotated Data" and edit your responses.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </AnnotatorNavbar>
  );
};

export default Instructions;
