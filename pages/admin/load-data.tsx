import { Button, Image, SimpleGrid, Text } from "@mantine/core";
import {
  Dropzone,
  FileWithPath,
  IMAGE_MIME_TYPE,
  MIME_TYPES,
} from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useState } from "react";
import AdminNavbar from "../../components/adminNavbar";
import Page from "../../components/page";

const LoadData = () => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [text, setText] = useState("click to select files");
  const [loading, setLoading] = useState(false);
  const handleFile = (files) => {
    console.log(files[0]);
    setFiles(files);
    setText(files[0].name);
  };
  const uploadFiles = async () => {
    setLoading(true);
    const response = await axios.post("/api/load-data", {
      path: files[0].path,
    });
    if (response.data.status === "success") {
      showNotification({
        title: "Success",
        message: response.data.message,
      });
      setLoading(false);
    }
  };
  return (
    <AdminNavbar>
      <Dropzone onDrop={(files) => handleFile(files)}>
        <div>
          <Text size="xl" inline>
            {text}
          </Text>
        </div>
      </Dropzone>
      <Button
        loading={loading}
        style={{ marginTop: ".2rem" }}
        onClick={uploadFiles}
      >
        Upload
      </Button>
    </AdminNavbar>
  );
};

export default LoadData;
