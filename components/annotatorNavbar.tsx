import React from "react";
import { AppShell, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useAuth } from "../lib/client/contexts/auth";
import Navbar from "./common/navbar";
const AnnotatorNavbar = ({ children }) => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  console.log({ user });

  const handleLogout = () => {
    const response = signOut();
    console.log({ response });
  };
  const items = [
    {
      name: "Annotated Data",
      url: `/${user.id}`,
    },
    {
      name: "Annotation",
      url: "/annotation",
    },
    {
      name: "Skipped Words",
      url: "/skip-words",
    },
    {
      name: "My Stats",
      url: `/${user.id}/stats`,
    },
    {
      name: "instructions",
      url: "/instructions",
    },
  ];
  return (
    <Navbar items={items} name={user.name} handleLogout={handleLogout}>
      {children}
    </Navbar>
  );
};

export default AnnotatorNavbar;
