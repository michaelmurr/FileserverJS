import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import React, { Component } from "react";
import axios from "axios";
export default class FilesUploadComponent extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      fileUpload: "",
    };
  }
  onFileChange(e) {
    this.setState({ fileUpload: e.target.files });
  }
  onSubmit(e) {
    e.preventDefault();
    var formData = new FormData();
    for (const key of Object.keys(this.state.fileUpload)) {
      formData.append("fileUpload", this.state.fileUpload[key]);
    }
    axios.post("/api/upload", formData, {}).then((res) => {
      console.log(res.data);
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <form
            onSubmit={this.onSubmit}
            encType="multipart/form-data"
            action=""
          >
            <div className="form-group">
              <input
                type="file"
                name="fileUpload"
                onChange={this.onFileChange}
                multiple
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Upload
              </button>
            </div>
          </form>
        </div>
        {/*
        <Form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Upload Files</Form.Label>
            <Form.Control
              type="file"
              multiple
              {...register("file")}
              name="fileUpload"
            />
          </Form.Group>
          <Button type="submit">Upload</Button>
        </Form>
*/}
      </div>
    );
  }
}
