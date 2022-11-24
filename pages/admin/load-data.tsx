import { Button, Image, SimpleGrid, Text } from "@mantine/core";
import {
  Dropzone,
  FileWithPath,
  IMAGE_MIME_TYPE,
  MIME_TYPES,
} from "@mantine/dropzone";
import axios from "axios";
import React, { useState } from "react";
import AdminNavbar from "../../components/adminNavbar";
import Page from "../../components/page";

const LoadData = () => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [text, setText] = useState("click to select files");
  const handleFile = (files) => {
    console.log(files[0]);
    setFiles(files);
    setText(files[0].name);
  };
  const uploadFiles = async () => {
    const response = await axios.post("/api/load-data", {
      path: files[0].path,
    });
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
      <Button style={{ marginTop: ".2rem" }} onClick={uploadFiles}>
        Upload
      </Button>
    </AdminNavbar>
  );
};

export default LoadData;
