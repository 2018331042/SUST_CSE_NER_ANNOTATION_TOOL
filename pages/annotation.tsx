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
import { userInfo } from "os";
import React, { useEffect, useState } from "react";
import Page from "../components/page";
import { useAuth } from "../lib/client/contexts/auth";
import connectDb from "../lib/db";
import Dataset from "../lib/models/dataset";
import convertToObj from "../utils/convertToObj";

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
  const { signOut, user } = useAuth();
  const [tags, setTags] = useState([]);
  const [tagId, setTagid] = useState([]);
  const [value, setValue] = useState(sentence);
  console.log({ value });
  const handleLogout = () => {
    const response = signOut();
    console.log({ response });
  };

  const handleAnnotatedData = () => {};

  const handleNext = async () => {
    console.log({ tags });
    // const response = await axios.post("/api/dataset/update-tag-sentence", {
    //   tags,
    //   sen_id: sentence._id,
    //   user_id: user.id,
    // });
    const result = await axios.get("/api/dataset/get-sentence");
    console.log({ result });
    setValue(result.data);
  };

  return (
    <Page>
      <AppShell
        navbar={
          <Navbar width={{ base: 250 }} height={500} p="xs">
            <Button
              variant="subtle"
              fullWidth
              size="xl"
              onClick={handleAnnotatedData}
            >
              Annotated Data
            </Button>
            <Button variant="subtle" size="xl" fullWidth onClick={handleLogout}>
              Logout
            </Button>
          </Navbar>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <div style={{ border: "1px solid black", padding: "1rem" }}>
          {value && (value.data !== null ? value.data.sentence : value.message)}
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
      </AppShell>
    </Page>
  );
};

export default Annotation;

export async function getServerSideProps() {
  await connectDb();
  const { data } = await axios.get(
    "http://localhost:3000/api/dataset/get-sentence"
  );
  console.log({ data });
  return {
    props: {
      sentence: data,
    },
  };
}
