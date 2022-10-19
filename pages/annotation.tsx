import {
  AppShell,
  Button,
  Card,
  Grid,
  Navbar,
  Radio,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import Page from "../components/page";
import { useAuth } from "../lib/client/contexts/auth";

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

const Annotation = () => {
  const { signOut } = useAuth();
  const [tags, setTags] = useState([]);
  const [tagId, setTagid] = useState([]);
  const handleLogout = () => {
    const response = signOut();
    console.log({ response });
  };

  const handleAnnotatedData = () => {};

  const handleNext = () => {
    console.log({ tags });
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
          ২০১৩ সালে সান্তোস ছেড়ে বার্সেলোনায় যোগ দেন নেইমার। সেই দলবদল নিয়ে
          জালিয়াতি ও দুর্নীতির অভিযোগে মামলা করেছিল ব্রাজিলের বিনিয়োগ প্রতিষ্ঠান
          ডিআইএস। ঘটনার ৯ বছর পর নেইমার এবং আরও ৮ জনের বিচার কাল শুরু হয়
          বার্সেলোনার আদালতে। সেই মামলার বিচারে বার্সেলোনার প্রাদেশিক আদালতে
          হাজিরা দিয়েছেন পিএসজির এই ব্রাজিলিয়ান তারকা। নেইমারের সঙ্গে এই মামলার
          বিবাদীপক্ষে আছেন তাঁর মা–বাবা, দুই ক্লাব বার্সেলোনা ও সান্তোস এবং
          ক্লাব দুটির সাবেক তিন সভাপতি। বার্সার সাবেক দুই সভাপতি জোসেপ মারিয়া
          বার্তোমেউ, স্যান্দ্রো রসেল এবং সান্তোসের সাবেক সভাপতি ওদিলো রদ্রিগেজ।
          মামলায় ডিআইএসের অভিযোগ, ব্রাজিলিয়ান ক্লাবটি থেকে নেইমারের বার্সেলোনায়
          যোগদানে দলবদলের আসল অঙ্কটা প্রকাশ করা হয়নি। এতে ডিআইএস স্বত্ব অনুযায়ী
          যে টাকাটা পাওয়ার কথা ছিল, তা পায়নি, কম পেয়েছে। পিএসজি তারকা নেইমার এ
          অভিযোগ অস্বীকার করে ২০১৭ সালে স্পেনের উচ্চ আদালতে আপিল করে হেরে যান।
          তারপর এই বিচারের প্রক্রিয়া শুরু করা হয়।
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
