import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Form, Table, Button } from "react-bootstrap";
import "../css/checkbox.css";

export default function Files() {
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/download", {
      method: "POST",
      body: JSON.stringify(selectedFiles),
    });
    const file = window.URL.createObjectURL(new Blob([res.data]));
    window.open(file);
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
        <Form onSubmit={handleSubmit}>
          <Button type="submit">Download</Button>
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
