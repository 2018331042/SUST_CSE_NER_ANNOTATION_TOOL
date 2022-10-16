import { AppShell, Button, Navbar } from "@mantine/core";
import React from "react";
import Page from "../components/page";
import { useAuth } from "../lib/client/contexts/auth";
import { client, GET_SENTENCE } from "../lib/server/graphql";

const Annotation = ({sentence}) => {
  const { signOut } = useAuth();
  const handleLogout = () => {
    const response = signOut();
    console.log({ response });
  };

  console.log({sentence: sentence[0].sentence});
  

  return (
    <Page>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 200 }} height={500} p="xs">
            <div>
              <h1>Profile</h1>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
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
        <div style={{border: "1px solid black", padding:"1rem"}}>
          { sentence[0].sentence}
        </div>
        <Button>Next</Button>
      </AppShell>
    </Page>
  );
};


export default Annotation;

export async function getServerSideProps(ctx: any) {
  const response = await client.query({
    query:GET_SENTENCE
  })

  console.log({response: response.data.datasets});

  return{
    props:{
      sentence: response.data.datasets
    }
  }
  
}

