import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Form, Table, Button } from "react-bootstrap";
import Axios from "axios";
import FileDownload from "js-file-download";
import { Confirm } from "react-admin";
import "../css/app.css";
import { useNavigate } from "react-router-dom";

export default function Files(props) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchClause, setSearchClause] = useState("");
  const [files, setFiles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getFiles();
  }, [props.shouldUpdate]);

  useEffect(() => {
    handleResize();
  }, []);

  const getFiles = async () => {
    setFiles([]);
    const res = await fetch(`${process.env.REACT_APP_API}/api/files`, {
      credentials: "include",
    });
    const json = await res.json();
    if (res.status !== 200) return navigate("/login");

    let stuff = JSON.stringify(json);
    let stuff2 = JSON.parse(stuff);
    setFiles(stuff2);
    props.setShouldUpdate(false);
  };

  //Handle Download
  //
  const onDownload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      return props.errorToast("No Files Selected");
    }
    try {
      const res = await Axios({
        url: `${process.env.REACT_APP_API}/api/download`,
        withCredentials: true,
        method: "POST",
        responseType: "blob",
        data: { selectedFiles },
      });
      FileDownload(res.data, "download.zip");
    } catch (e) {
      const json = await JSON.parse(e.request.responseText);
      props.errorToast(json.message);
    }
  };

  //Handling deletion
  //
  const onDelete = async (e) => {
    e.preventDefault();
    try {
      await Axios({
        url: `${process.env.REACT_APP_API}/api/delete`,
        method: "DELETE",
        data: { selectedFiles },
        withCredentials: true,
      });

      setOpen(false);
      props.successToast("Removed Files");
      setSelectedFiles([]);
      props.setShouldUpdate(true);
    } catch (e) {
      const json = await JSON.parse(e.request.responseText);
      console.log(json);
      props.errorToast(json.message);
    }
  };
  const handleConfirm = (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      return props.errorToast("No Files Selected");
    }
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

  //Handling search
  //
  const onSearchChange = async (e) => {
    setSearchClause(e.target.value);
  };

  const submitSearch = async (e) => {
    e.preventDefault();

    if (searchClause.length === 0) {
      return props.setShouldUpdate(true);
    }
    setSelectedFiles([]);
    const res = await fetch(
      `${process.env.REACT_APP_API}/api/search/${searchClause}`,
      { credentials: "include" }
    );
    const json = await res.json();
    setFiles(json);
  };

  //Handle Logging out
  //
  const onLogout = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}/api/logout`, {
      credentials: "include",
    });
    if (res.status === 200) return navigate("/login");
  };

  const handleResize = () => {
    if (window.innerWidth < 922) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  return (
    <div className="filesContainer dark-bg">
      <Form onSubmit={submitSearch} className="form searchForm">
        <Form.Control
          type="text"
          placeholder="Search Files"
          onChange={onSearchChange}
          className="inputField"
        />
        <Button type="submit" style={{ marginLeft: "1em" }}>
          Search
        </Button>
      </Form>

      <Form>
        <Confirm
          isOpen={open}
          onConfirm={onDelete}
          onClose={handleClose}
          content={"This action can not be undone!"}
          title={"Delete Files"}
          confirm={"Confirm"}
          cancel={"Cancel"}
          style={{ backgroundColor: "red" }}
        />
        <Button
          variant="success"
          type="submit"
          onClick={onDownload}
          style={{ margin: "1em", marginLeft: 0 }}
        >
          Download
        </Button>

        <Button variant="danger" type="submit" onClick={handleConfirm}>
          Delete
        </Button>
        <Button
          variant="secondary"
          type="submit"
          onClick={onLogout}
          style={{ marginLeft: "1em" }}
        >
          Log Out
        </Button>
        <Table hover variant="dark">
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Size</th>
              {!isMobile && <th>Uploaded on</th>}
            </tr>
          </thead>
          <tbody>
            {files.map((file, i) => (
              <tr key={i}>
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
                {!isMobile && <td>{file.uploadDate}</td>}
              </tr>
            ))}
          </tbody>
        </Table>
      </Form>
    </div>
  );
}
