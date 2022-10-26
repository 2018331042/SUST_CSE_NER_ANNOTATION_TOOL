import { Button, Card, Grid, Radio, Text } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Page from "../../components/page";
import Dataset from "../../lib/models/dataset";
const options = ["PER", "ORG", "LOC", "others"];
const Edit = ({ sentence }) => {
  const [tags, setTags] = useState(sentence.tags);
  const [tagId, setTagid] = useState([]);
  const [value, setValue] = useState(sentence);
  const [tokens, setTokens] = useState([]);
  const router = useRouter();
  console.log({ tags });

  useEffect(() => {
    console.log({ value });
    const words = Object.keys(tags);
    const wordsObject = words.map((e, idx) => {
      return {
        id: idx,
        word: e,
      };
    });
    const tagOptions = Object.values(tags);
    console.log({ tagOptions });

    console.log({ wordsObject });
    setTokens(wordsObject);
    setTagid(tagOptions);
  }, [value.sentence]);

  const handlerDone = async () => {
    const response = await axios.post("/api/dataset/update-edit-tag", {
      sen_id: value.id,
      tags,
    });

    if (response.data.status === "SUCCESS") {
      alert("updated Successfully");
      router.back();
    } else {
      alert("something wrong");
    }
  };

  return (
    <Page>
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
              <div style={{ display: "flex", marginTop: "1rem", gap: "1rem" }}>
                <div>
                  <Button onClick={handlerDone}>Done</Button>
                </div>
                <div>
                  <Button onClick={() => router.back()}>Cancel</Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Page>
  );
};

export default Edit;

export async function getServerSideProps(ctx: any) {
  const { id } = ctx.query;
  console.log({ id });

  const findSentence = await Dataset.findById({ _id: id }).lean();
  console.log(findSentence);

  // const sentence = convertToObj(findSentence);

  const sentence = {
    id: findSentence._id.toString(),
    sentence: findSentence.sentence,
    tags: findSentence.tag_sentence,
  };
  console.log({ sentence });

  return {
    props: {
      sentence,
    },
  };
}
