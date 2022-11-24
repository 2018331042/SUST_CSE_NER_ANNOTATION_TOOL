import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { userAgent } from "next/server";
import React from "react";
import { useAuth } from "../lib/client/contexts/auth";
import Navbar from "./common/navbar";

const AdminNavbar = ({ children }) => {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    const response = signOut();
  };
  const items = [
    {
      name: "Annotated Sentences",
      url: "/admin",
    },
    {
      name: "Skipped Words",
      url: "/admin/skip-words",
    },
    {
      name: "User Stats",
      url: "/admin/annotator-stats",
    },
    {
      name: "Garbage Words",
      url: "/admin/garbage-data",
    },
    {
      name: "Load Data",
      url: "/admin/load-data",
    },
    {
      name: "Assign Annotators",
      url: "/admin/assign-annotator",
    },
  ];
  return (
    <Navbar items={items} name={user.name} handleLogout={handleLogout}>
      {children}
    </Navbar>
  );
};

export default AdminNavbar;
