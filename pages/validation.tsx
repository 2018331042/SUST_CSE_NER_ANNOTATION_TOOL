import { Button, Card, Grid, Radio, Text } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Page from "../components/page";
import { tagOptions } from "../utils/const";
import Dataset from "../lib/models/dataset";
import AnnotatorNavbar from "../components/annotatorNavbar";
import { webSiteUrl } from "../utils/urls";
import { useAuth } from "../lib/client/contexts/auth";
const Validation = ({ sentence }) => {
  const [tags, setTags] = useState(sentence.tags);
  const [tagId, setTagid] = useState([]);
  const [value, setValue] = useState(sentence);
  const [tokens, setTokens] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  console.log({ user });

  useEffect(() => {
    const words = Object.keys(tags);
    const wordsObject = words.map((e, idx) => {
      return {
        id: idx,
        word: e,
      };
    });
    const tagOptions = Object.values(tags);

    setTokens(wordsObject);
    setTagid(tagOptions);
  }, [value.sentence]);

  const handlerDone = async () => {
    const response = await axios.post("/api/dataset/validation", {
      sen_id: value.id,
      serial_no: value.serial_no,
      sentence: value.sentence,
      numberOfTagWords: value.numberOfTagWords,
      validator_id: user.id,
      tags,
    });
    console.log({ response });

    if (response.data.status === "success") {
      const { data } = await axios.post("/api/dataset/get-no-validate", {
        sen_id: value.id,
        token: localStorage.getItem("token"),
      });
      const sentence = {
        id: data.data._id,
        serial_no: data.data.serial_no,
        sentence: data.data.sentence,
        tags: data.data.tag_sentence,
        numberOfTagWords: data.data.numberOfTagWords,
        user_id: data.data.user_id,
      };

      setTags(sentence.tags);
      setValue(sentence);
    } else {
      setValue(response.data);
    }
  };

  return (
    <AnnotatorNavbar>
      <div>
        {value && (
          <>
            <div style={{ border: "1px solid black", padding: "1rem" }}>
              {value.sentence}
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Grid grow>
                {tokens.map((token) => (
                  <Grid.Col span={4} key={token.id}>
                    <Card>
                      <Card.Section>
                        <Text>{token.word}</Text>
                      </Card.Section>
                      <Card.Section>
                        {tagOptions.map((op) => (
                          <Radio
                            key={op}
                            value={op}
                            label={op}
                            checked={tagId[token.id] === op}
                            onChange={() => {
                              setTags({
                                ...tags,
                                [token.word]: op,
                              });
                              setTagid({
                                ...tagId,
                                [token.id]: op,
                              });
                            }}
                          />
                        ))}
                      </Card.Section>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
              <div style={{ display: "flex", marginTop: "1rem", gap: "1rem" }}>
                <div>
                  <Button onClick={handlerDone}>Next</Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AnnotatorNavbar>
  );
};

export default Validation;

export async function getServerSideProps(ctx: any) {
  const { id } = ctx.query;
  const { token } = ctx.req.cookies;
  //   const findSentence = await Dataset.findOne({
  //     isAnnotated: true,
  //     isValidated: false,
  //   }).lean();

  //   console.log({ findSentence });

  // const sentence = {
  //   id: findSentence._id.toString(),
  //   serial_no: findSentence.serial_no,
  //   sentence: findSentence.sentence,
  //   tags: findSentence.tag_sentence,
  //   numberOfTagWords: findSentence.numberOfTagWords,
  //   user_id: findSentence.user_id,
  // };

  const { data } = await axios.post(
    `${webSiteUrl}/api/dataset/get-no-validate`,
    {
      token,
    }
  );
  console.log({ data });

  const sentence = {
    id: data.data._id,
    serial_no: data.data.serial_no,
    sentence: data.data.sentence,
    tags: data.data.tag_sentence,
    numberOfTagWords: data.data.numberOfTagWords,
    user_id: data.data.user_id,
  };

  return {
    props: {
      sentence,
    },
  };
}
