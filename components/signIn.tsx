import React from "react";
import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../lib/client/contexts/auth";

interface Values {
  email: string;
  password: string;
}
function Signin() {
  const { signIn, isLoading } = useAuth();

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
    const { email, password } = values;
    console.log({ email, password });

    const response = await signIn(email, password);
    console.log({ response });
  };
  console.log({ isLoading });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Password"
          placeholder="password"
          {...form.getInputProps("password")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default Signin;
