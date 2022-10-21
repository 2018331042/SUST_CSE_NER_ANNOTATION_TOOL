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
import { useAuth } from "../lib/client/contexts/auth";
import connectDb from "../lib/db";
import { webSiteUrl } from "../utils/urls";
import jwt from "jsonwebtoken";

const options = ["PER", "ORG", "LOC", "others"];
const tokens = [
  {
    id: 1,
    word: "বার্সেলোনায়",
    options,
  },
  {
    id: 2,
    word: "অনুযায়ী",
    options,
  },
  {
    id: 3,
    word: "বার্সেলোনায়",
    options,
  },
];

const Annotation = ({ sentence }) => {
  const [tags, setTags] = useState([]);
  const [tagId, setTagid] = useState([]);
  const [value, setValue] = useState(sentence);
  // const [sentence, setSentence] = useState("");
  console.log({ value });

  // useEffect(() => {
  //   const sentence = JSON.parse(localStorage.getItem("sentence"));
  //   console.log({ sentence });

  //   if (sentence !== null) {
  //     setValue(sentence);
  //     return;
  //   }
  //   (async () => {
  //     const result = await axios.get("/api/dataset/get-sentence");
  //     console.log({ result });
  //     localStorage.setItem("sentence", JSON.stringify(result.data));
  //     setValue(result.data);
  //   })();
  // }, []);

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
                            {token.options.map((op) => (
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
                  <div style={{ marginTop: "1rem" }}>
                    <Button onClick={handleNext}> Next</Button>
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

export async function getServerSideProps(ctx) {
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
