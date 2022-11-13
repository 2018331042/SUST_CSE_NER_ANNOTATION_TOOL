import { AppShell, Button, Navbar } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../lib/client/contexts/auth";

const AdminNavbar = ({ children }) => {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = () => {
    const response = signOut();
  };
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          {" "}
          <Button
            variant="subtle"
            size="xl"
            fullWidth
            onClick={() => router.push("/admin")}
          >
            Annotated Sentence
          </Button>
          <Button
            variant="subtle"
            size="xl"
            fullWidth
            onClick={() => router.push("/admin/annotator-stats")}
          >
            User Stats
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
      {children}
    </AppShell>
  );
};

export default AdminNavbar;
