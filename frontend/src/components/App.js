import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/app.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { successToast, errorToast } from "./customToast";

import Upload from "./Upload";
import Files from "./Files";
import Loginform from "./Loginform";
import Registerform from "./Registerform";

export default function App() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  const navigate = useNavigate();

  const getFiles = async () => {
    setFiles([]);
    const res = await fetch("/api/files");
    if (res.status !== 200) return navigate("/login");
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
      <Routes>
        <Route
          path="/"
          element={
            <>
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
            </>
          }
        />
        <Route path="/login" element={<Loginform />} />
        <Route path="/register" element={<Registerform />} />
      </Routes>
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
