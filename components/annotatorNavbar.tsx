import React from "react";
import { AppShell, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useAuth } from "../lib/client/contexts/auth";
import Navbar from "./common/navbar";
const AnnotatorNavbar = ({ children }) => {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    const response = signOut();
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
      name: "Instructions",
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
