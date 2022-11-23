import React from "react";

const LandingPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "85px", textAlign: "center" }}>
          Name Entity Recognizer
        </h1>
        <div>@ Powered By CSE, SUST</div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          width: "100vw",
          height: "100vh",
        }}
      >
        <div>Login Form</div>
        {/* <div>Hello</div> */}
      </div>
    </div>
  );
};

export default LandingPage;
