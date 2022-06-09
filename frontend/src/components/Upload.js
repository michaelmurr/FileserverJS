import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
export default function Upload() {
  const [fileUpload, setFileUpload] = useState("");

  const onFileChange = (e) => {
    setFileUpload(e.target.files);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    for (const key of Object.keys(fileUpload)) {
      formData.append("fileUpload", fileUpload[key]);
    }
    axios.post("/api/upload", formData, {}).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div className="uploadContainer">
      <div className="row">
        <Form onSubmit={onSubmit} encType="multipart/form-data" action="">
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Upload Files</Form.Label>
            <Form.Control
              type="file"
              name="fileUpload"
              onChange={onFileChange}
              multiple
            />
          </Form.Group>
          <Button type="submit">Upload</Button>
        </Form>
      </div>
    </div>
  );
}
