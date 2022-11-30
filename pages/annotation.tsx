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
import React, { useEffect, useState } from "react";
import AnnotatorNavbar from "../components/annotatorNavbar";
import Page from "../components/page";
import connectDb from "../lib/db";
import { tagOptions } from "../utils/const";
import { tokenize } from "../utils/tokenize";
import { webSiteUrl } from "../utils/urls";
import LandingPage from "./landingPage";

const Annotation = ({ sentence }) => {
  const [tags, setTags] = useState([]);
  const [tagId, setTagid] = useState([]);
  const [value, setValue] = useState(sentence);
  const [tokens, setTokens] = useState([]);
  const [numberOfWords, setNumberOfWords] = useState<Number>(0);

  useEffect(() => {
    (async () => {
      try {
        const response = tokenize(value.data.sentence);
        const words = response;
        const wordsObject = words.map((e, idx) => {
          return {
            id: idx + 1,
            word: e,
          };
        });
        setTokens(wordsObject);
        setNumberOfWords(words.length);
      } catch (err) {}
    })();
  }, [value.data.sentence]);

  const handleNext = async () => {
    const response = await axios.post("/api/dataset/update-tag-sentence", {
      tags,
      sen_id: value.data._id,
      token: localStorage.getItem("token"),
      numberOfWords,
    });

    const result = await axios.post("/api/dataset/get-sentence", {
      token: localStorage.getItem("token"),
    });
    setValue(result.data);
    setTags([]);
    setTagid([]);
  };

  const handleSkip = async () => {
    const result = await axios.post("/api/dataset/get-sentence-after-skip", {
      sen_id: value.data._id,
      token: localStorage.getItem("token"),
    });
    setValue(result.data);
    setTags([]);
    setTagid([]);
  };

  return (
    <AnnotatorNavbar>
      <div>
        {value &&
          (value.data !== "" ? (
            <>
              <div
                style={{
                  border: "1px solid black",
                  padding: "1rem",
                }}
              >
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
                    <Button onClick={handleSkip}>Skip</Button>
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
  );
};

export default Annotation;

export async function getServerSideProps(ctx: any) {
  await connectDb();
  const { token } = ctx.req.cookies;
  const { data } = await axios.post(`${webSiteUrl}/api/dataset/get-sentence`, {
    token,
  });
  return {
    props: {
      sentence: data,
    },
  };
}
