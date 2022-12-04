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
              word, it will be tagged as <b>"B-Per"</b>
              <h4>
                The underlined words are example of <b>B-per</b>
              </h4>
              <p>
                আমাদের প্রামাণ্যচিত্রে <u>টমাস</u> ডিক্সটার বলেছেন, "আমরা সবাই{" "}
                <u>বিল</u> গেটস হতে পারি না।
              </p>
            </div>
            <div>
              <b>I-Per:</b> All the words in a person's name, except the first
              and the last one will be tagged as<b>"I-Per"</b>.
              <h4>
                The underlined words are example of <b>I-per</b>
              </h4>
              <p>
                মার্শাল জামাল <u>উদ্দিন</u> আহমেদ বহর থেকে এফ-২৮ বাদ দেয়ার
                ব্যাপারে চূড়ান্ত সিদ্ধান্তের কথা জানান
              </p>
            </div>
            <div>
              <b>E-Per:</b> The last word in a person's name.
              <h4>
                The underlined words are example of <b>B-per</b>
              </h4>
              <p>
                আমাদের প্রামাণ্যচিত্রে <u>টমাস</u> ডিক্সটার বলেছেন, "আমরা সবাই{" "}
                <u>বিল</u> গেটস হতে পারি না।
              </p>
            </div>
            <div>
              {" "}
              <b>B-Org:</b> The first word in the name of an
              organization/instituition.
              <h4>
                The underlined words are example of <b>B-Org</b>
              </h4>
              <p>
                <u>শাহজালাল</u> বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় এবছর
                দ্বিতীয়বারের মতো অনুষ্ঠানটি আয়োজন করতে যাচ্ছে
              </p>
            </div>
            <div>
              <b>I-Org:</b> All words except the first and the last one in the
              name of an organization/instituition.
              <h4>
                The underlined words are example of <b>I-Org</b>
              </h4>
              <p>
                শাহজালাল <u>বিজ্ঞান ও প্রযুক্তি</u> বিশ্ববিদ্যালয় এবছর
                দ্বিতীয়বারের মতো অনুষ্ঠানটি আয়োজন করতে যাচ্ছে
              </p>
            </div>
            <div>
              <b>E-Org:</b> The last word in the name of an
              organization/institution.
              <h4>
                The underlined words are example of <b>E-Org</b>
              </h4>
              <p>
                শাহজালাল বিজ্ঞান ও প্রযুক্তি <u>বিশ্ববিদ্যালয়</u> এবছর
                দ্বিতীয়বারের মতো অনুষ্ঠানটি আয়োজন করতে যাচ্ছে
              </p>
            </div>
            <div>
              <b>Loc:</b> The word represents a location or a physical place.
              <h4>
                The underlined words are example of <b>Loc</b>
              </h4>
              <p>
                পথিমধ্যে <u>নিজনান্দুয়ালী</u> এবছর এলাকার কিছু রাজাকার তাকে
                হাত-পা বেঁধে নদীতে ডুবিয়ে হত্যা করে।
              </p>
              <p>
                <u>বাংলাদেশের</u> অভ্যন্তরে <u>ভারতের</u> ১১১টি ও <u>ভারতের</u>{" "}
                অভ্যন্তরে <u>বাংলাদেশের</u> ৫১টি ছিটমহল রয়েছে।
              </p>
            </div>
            <div>
              <b>Time:</b> The word specifies a time/event.
              <h4>
                The underlined words are example of <b>Loc</b>
              </h4>
              <p>
                গত <u>বসন্তে</u> তার সাথে আমার শেষ দেখা হয়েছিলো।
              </p>
              <p>
                {" "}
                <u>সাতচল্লিশের</u> দেশভাগের পরেই শুরু ছিটমহল আখ্যানের।
              </p>
            </div>
            <div>
              <b>Object:</b> The name of a thing or any object.
              <h4>
                The underlined words are example of <b>Loc</b>
              </h4>
              <p>
                <u>ডিনার সেট</u> কেনায় চামেলী কোন বিষয়টি বিবেচনা করেছেন?
              </p>
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
