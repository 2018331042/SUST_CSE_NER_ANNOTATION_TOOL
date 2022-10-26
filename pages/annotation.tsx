import {
  AppShell,
  Button,
  Card,
  Grid,
  Navbar,
  Radio,
  Text,
} from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AnnotatorNavbar from "../components/annotatorNavbar";
import Page from "../components/page";
import connectDb from "../lib/db";
import { webSiteUrl } from "../utils/urls";

const options = ["PER", "ORG", "LOC", "others"];
const Annotation = ({ sentence }) => {
  const [tags, setTags] = useState([]);
  const [tagId, setTagid] = useState([]);
  const [value, setValue] = useState(sentence);
  const [tokens, setTokens] = useState([]);
  const [numberOfWords, setNumberOfWords] = useState<Number>(0);

  useEffect(() => {
    console.log({ value });
    const words = value.data.sentence.split(" ");
    const wordsObject = words.map((e, idx) => {
      return {
        id: idx + 1,
        word: e,
      };
    });
    console.log({ words: words.length });
    setTokens(wordsObject);
    setNumberOfWords(words.length);
  }, [value.data.sentence]);

  const handleNext = async () => {
    console.log({ tags });
    const response = await axios.post("/api/dataset/update-tag-sentence", {
      tags,
      sen_id: value.data._id,
      token: localStorage.getItem("token"),
    });
    console.log({ response });

    const result = await axios.post("/api/dataset/get-sentence", {
      token: localStorage.getItem("token"),
    });
    console.log({ result });
    setValue(result.data);
    setTags([]);
    setTagid([]);
  };
  console.log({ tags });

  return (
    <Page>
      <AnnotatorNavbar>
        <div>
          {value &&
            (value.data !== null ? (
              <>
                <div style={{ border: "1px solid black", padding: "1rem" }}>
                  {value.data.sentence}
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
                            {options.map((op) => (
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
                  <div
                    style={{ display: "flex", marginTop: "1rem", gap: "1rem" }}
                  >
                    {Object.keys(tagId).length === numberOfWords ? (
                      <div>
                        <Button onClick={handleNext}> Next</Button>
                      </div>
                    ) : (
                      <div>
                        <Button disabled> Next</Button>
                      </div>
                    )}
                    <div>
                      <Button>Skip</Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ border: "1px solid black", padding: "1rem" }}>
                {value.message}
              </div>
            ))}
        </div>
      </AnnotatorNavbar>
    </Page>
  );
};

export default Annotation;

export async function getServerSideProps(ctx: any) {
  await connectDb();
  // console.log({ token: localStorage.getItem("token") });
  // console.log({ cookie: ctx.req });
  const { token } = ctx.req.cookies;
  console.log({ token });
  const { data } = await axios.post(`${webSiteUrl}/api/dataset/get-sentence`, {
    token,
  });
  console.log({ data });
  return {
    props: {
      sentence: data,
    },
  };
}
