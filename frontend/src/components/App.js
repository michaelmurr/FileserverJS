import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/app.css";

import { successToast, errorToast } from "./customToast";

import Upload from "./Upload";
import Files from "./Files";

export default function App() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  const getFiles = async () => {
    setFiles([]);
    const res = await fetch("/api/files");
    const json = await res.json();

    let stuff = JSON.stringify(json);
    let stuff2 = JSON.parse(stuff);
    setFiles(stuff2);
    setIsLoading(false);
    setShouldUpdate(false);
  };

  useEffect(() => {
    getFiles();
  }, [shouldUpdate]);

  return (
    <div className="dark-bg">
      <Upload
        successToast={successToast}
        errorToast={errorToast}
        setShouldUpdate={setShouldUpdate}
        isLoading={isLoading}
      />
      <Files
        successToast={successToast}
        errorToast={errorToast}
        files={files}
        isLoading={isLoading}
        setShouldUpdate={setShouldUpdate}
        shouldUpdate={shouldUpdate}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
