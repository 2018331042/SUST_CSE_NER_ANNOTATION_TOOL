import {
  Box,
  Button,
  Group,
  PasswordInput,
  Table,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { openConfirmModal } from "@mantine/modals";
import axios from "axios";
import React from "react";
import useSWR from "swr";
import AdminNavbar from "../../components/adminNavbar";
import Page from "../../components/page";

const fetcher = (url) => fetch(url).then((res) => res.json());
const AssignAnnotator = () => {
  const { data, error } = useSWR("/api/auth/get-annotators", fetcher, {
    refreshInterval: 1000,
  });
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  if (error) return <div>failed to load</div>;
  console.log(data);
  const rows = data?.annotators.map((annotator) => (
    <tr key={annotator.email}>
      <td>{annotator.name}</td>
      <td>{annotator.email}</td>
      {annotator.isActive === true ? (
        <td>
          <Button
            color="green"
            onClick={() => openModal(annotator.isActive, annotator._id)}
          >
            Active
          </Button>
        </td>
      ) : (
        <td>
          <Button
            color="red"
            onClick={() => openModal(annotator.isActive, annotator._id)}
          >
            Inactive
          </Button>
        </td>
      )}
    </tr>
  ));

  const handlerSubmit = async (values) => {
    console.log(values);
    const response = await axios.post("/api/load-user", { values });
    console.log({ response });
  };

  const handleConfirm = async (isActive: Boolean, id: String) => {
    const response = await axios.post("/api/auth/user-status", {
      isActive,
      id,
    });
  };
  const openModal = (isActive: Boolean, id: String) =>
    openConfirmModal({
      title: "Please confirm your action",
      children: isActive ? (
        <p>Are you sure you want to deactivate this annotator?</p>
      ) : (
        <p>Are you sure you want to activate this annotator?</p>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("cancel"),
      onConfirm: () => handleConfirm(isActive, id),
    });

  return (
    <Page>
      <AdminNavbar>
        {!data ? (
          <div>Loading..</div>
        ) : (
          <>
            <h1>Assign New Annotator</h1>
            <div style={{ maxWidth: "300px" }}>
              <form onSubmit={form.onSubmit((values) => handlerSubmit(values))}>
                <TextInput
                  withAsterisk
                  label="Name"
                  {...form.getInputProps("name")}
                />
                <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="your@email.com"
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  withAsterisk
                  label="password"
                  {...form.getInputProps("password")}
                ></PasswordInput>
                <Group position="right" mt="md">
                  <Button type="submit">Submit</Button>
                </Group>
              </form>
            </div>
            <h3>Annotators List</h3>
            <Table withBorder withColumnBorders>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </>
        )}
      </AdminNavbar>
    </Page>
  );
};

export default AssignAnnotator;
