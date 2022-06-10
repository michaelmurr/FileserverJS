import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Form, Table, Button } from "react-bootstrap";
import "../css/checkbox.css";
import Axios from "axios";
import FileDownload from "js-file-download";
import { Confirm } from "react-admin";

export default function Files() {
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getFiles = async () => {
      const res = await fetch("/api/files");
      const json = await res.json();

      let stuff = JSON.stringify(json);
      let stuff2 = JSON.parse(stuff);

      setFiles(stuff2);
      setIsLoading(false);
    };
    getFiles();
  }, []);

  const onDownload = (e) => {
    e.preventDefault();

    Axios({
      url: "/api/download",
      method: "POST",
      responseType: "blob",
      data: { selectedFiles },
    }).then((res) => {
      res.status === 200
        ? FileDownload(res.data, "download.zip")
        : alert("Something went wrong");
    });
  };

  const onDelete = (e) => {
    e.preventDefault();

    Axios({
      url: "/api/delete",
      method: "POST",
      responseType: "blob",
      data: { selectedFiles },
    }).then((res) => {
      setOpen(false);
    });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleCheckbox = (e) => {
    let data = selectedFiles;

    if (e.target.checked) {
      data.push(e.target.id);
    } else {
      let index = data.indexOf(e.target.id);
      if (index !== -1) data.splice(index, 1);
    }
    setSelectedFiles(data);
  };

  return (
    <div className="filesContainer">
      {isLoading && <h1>Loading Files...</h1>}
      {!isLoading && files !== null && (
        <Form>
          <Confirm
            isOpen={open}
            onConfirm={onDelete}
            onClose={handleClose}
            content={"This action can not be undone!"}
            title={"Delete Files"}
            confirm={"Confirm"}
            cancel={"Cancel"}
          />
          <Button type="submit" onClick={onDownload}>
            Download
          </Button>

          <Button type="submit" onClick={handleConfirm}>
            Delete
          </Button>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Size</th>
                <th>Uploaded on</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr>
                  <td>
                    <Form.Check
                      type="checkbox"
                      className="custom-checkbox"
                      id={file.fileName}
                      onChange={handleCheckbox}
                    />
                  </td>
                  <td>{file.fileName}</td>
                  <td>{file.fileSize}</td>
                  <td>{file.uploadDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Form>
      )}
    </div>
  );
}
