import React from "react";
import { AppShell, Navbar, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useAuth } from "../lib/client/contexts/auth";
const AnnotatorNavbar = ({ children }) => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  console.log({ user });

  const handleLogout = () => {
    const response = signOut();
    console.log({ response });
  };
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 250 }} height={500} p="xs">
          {" "}
          <Button
            variant="subtle"
            fullWidth
            size="xl"
            onClick={() => router.push("/annotation")}
          >
            Annotation
          </Button>
          <Button
            variant="subtle"
            fullWidth
            size="xl"
            onClick={() => router.push(`/${user.id}`)}
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
      {children}
    </AppShell>
  );
};

export default AnnotatorNavbar;
