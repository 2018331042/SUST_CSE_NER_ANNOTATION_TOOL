import { Button, Menu } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineArrowRight } from "react-icons/ai";

const Navbar = ({ items, children, name, handleLogout }) => {
  const [hover, setHover] = useState(-1);
  const router = useRouter();
  const selected = (url: String) => {
    console.log({ url });
    console.log({ router });

    if (router.asPath === url) {
      return { backgroundColor: "#526295" };
    } else {
      return {};
    }
  };
  const handleHover = (name) => {
    if (name === hover) {
      return { backgroundColor: "#526295" };
    }
  };
  const navList = items.map((item) => {
    return (
      <Button
        key={item.name}
        onMouseEnter={() => setHover(item.name)}
        onMouseLeave={() => setHover(-1)}
        variant="subtle"
        fullWidth
        size="xl"
        style={{
          color: "white",
          ...(hover ? handleHover(item.name) : null),
          ...selected(item.url),
        }}
        onClick={() => router.push(item.url)}
      >
        {item.name}
      </Button>
    );
  });
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
          justifyContent: "space-between",
          alignItems: "center",
          flex: 0.8,
          overflowY: "hidden",
          backgroundColor: "#43436f",
          color: "white",
        }}
      >
        <div style={{ width: "100%" }}>
          <h2 style={{ textAlign: "center" }}>Name Entity Recognizer</h2>
          <hr style={{ width: "100%" }} />
          {navList}
        </div>
        <Menu>
          <Menu.Target>
            <Button fullWidth size="xl" rightIcon={<AiOutlineArrowRight />}>
              {name}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<FiLogOut />} onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div
        style={{ padding: "2rem", overflowY: "auto", height: "100vh", flex: 4 }}
      >
        {children}
      </div>
    </div>
  );
};

export default Navbar;
