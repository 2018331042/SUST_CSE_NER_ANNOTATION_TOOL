import { Loader } from "@mantine/core";
import React from "react";

const LoaderBar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Loader variant="bars" />
    </div>
  );
};

export default LoaderBar;
