import { AppShell, Button, Navbar } from "@mantine/core";
import React from "react";
import Page from "../components/page";
import { useAuth } from "../lib/client/contexts/auth";

const Annotation = () => {
  const { signOut } = useAuth();
  const handleLogout = () => {
    const response = signOut();
    console.log({ response });
  };
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
        <div>Data Annotation</div>
      </AppShell>
    </Page>
  );
};

export default Annotation;
