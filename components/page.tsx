import { AppShell, Header, Navbar, Text, Title } from "@mantine/core";
import React from "react";
import { useAuth } from "../lib/client/contexts/auth";

function Page({ children }) {
  const { user, isLoading } = useAuth();
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <div
            style={{
              color: "black",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title order={3}>Name Entity Recognizer</Title>
            <div>{user?.name}</div>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

export default Page;
