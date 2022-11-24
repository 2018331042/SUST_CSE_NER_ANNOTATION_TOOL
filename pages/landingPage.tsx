import { Anchor, Box, Button, Divider, NavLink, Title } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useState } from "react";

const LandingPage = ({ children }) => {
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const selected = (url) => {
    if (router.pathname === url) {
      return { backgroundColor: "#526295" };
    } else {
      return {};
    }
  };
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 0.8,
          overflowY: "hidden",
          backgroundColor: "#43436f",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Name Entity Recognizer</h2>
        <hr style={{ width: "100%" }} />
        <Button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          variant="subtle"
          fullWidth
          size="xl"
          style={{
            color: "white",
            ...(hover ? { backgroundColor: "#22c1c3" } : null),
            ...selected("/annotation"),
          }}
        >
          Annotated Data
        </Button>
      </div>
      <div
        style={{ padding: "2rem", overflowY: "auto", height: "100vh", flex: 4 }}
      >
        {children}
      </div>
    </div>
  );
};

export default LandingPage;
