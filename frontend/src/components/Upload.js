import "bootstrap/dist/css/bootstrap.min.css";
import "../css/app.css";
import { Form, Button, ProgressBar } from "react-bootstrap";
import React, { useState } from "react";
import Axios from "axios";

export default function Upload(props) {
  const [fileUpload, setFileUpload] = useState("");
  const [progress, setProgress] = useState();

  const onFileChange = (e) => {
    setFileUpload(e.target.files);
  };

  const onUpload = async (e) => {
    e.preventDefault();
    var formData = new FormData();

    if (fileUpload === null || fileUpload.length === 0) {
      return props.errorToast("No Files Selected");
    }

    for (const key of Object.keys(fileUpload)) {
      formData.append("fileUpload", fileUpload[key]);
    }
    try {
      const res = await Axios.post("/api/upload", formData, {
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      });
      props.successToast("Upload Successful");
      props.setShouldUpdate(true);
    } catch (e) {
      const json = await JSON.parse(e.request.responseText);
      console.log(json);
      props.errorToast(json.message);
    }
  };

  return (
    <div className="uploadContainer">
      <div className="row">
        <Form
          onSubmit={onUpload}
          encType="multipart/form-data"
          action=""
          className="form"
          style={{
            justifyContent: "flex-start",
          }}
        >
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Control
              type="file"
              name="fileUpload"
              onChange={onFileChange}
              className="dark-bg form"
              multiple
            />
          </Form.Group>
          <Button
            type="submit"
            style={{ marginLeft: "1em", marginTop: "1em", height: "2.5em" }}
          >
            Upload
          </Button>
          {progress && (
            <ProgressBar
              now={progress}
              label={`${progress}%`}
              style={{
                margin: "2em",
                marginLeft: "1em",
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "20em",
              }}
            />
          )}
        </Form>
      </div>
    </div>
  );
}
