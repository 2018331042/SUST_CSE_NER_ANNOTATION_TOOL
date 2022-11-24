import React, { useState } from "react";
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  PasswordInput,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "../lib/client/contexts/auth";
import { showNotification } from "@mantine/notifications";

interface Values {
  email: string;
  password: string;
}
function Signin() {
  const { signIn, isLoading, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  if (isLoading) {
    return <Loader variant="bars" />;
  }

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: Values) => {
    setLoading(true);
    const { email, password } = values;
    console.log({ email, password });

    const response = await signIn(email, password);
    console.log({ response });
    if (response.status === "success") {
      console.log("success");

      showNotification({
        title: "SUCCESSFUL",
        message: response.message,
        style: { backgroundColor: "#7bc62d" },
        color: "white",
      });
      return;
    }
    showNotification({
      title: "FAILED",
      message: response.message,
      style: { backgroundColor: "#7bc62d" },
      color: "white",
    });
    setLoading(false);
  };

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
          backgroundColor: "#43436f",
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
        <Box sx={{ maxWidth: 400 }} mx="auto">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="password"
              {...form.getInputProps("password")}
            />

            <Group position="right" mt="md">
              <Button loading={loading} type="submit">
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
}

export default Signin;
