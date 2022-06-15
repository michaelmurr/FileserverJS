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
import Drivespace from "./Drivespace";

export default function App() {
  const [shouldUpdate, setShouldUpdate] = useState(true);

  return (
    <div className="dark-bg">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Drivespace />
              <Upload
                successToast={successToast}
                errorToast={errorToast}
                setShouldUpdate={setShouldUpdate}
              />
              <Files
                successToast={successToast}
                errorToast={errorToast}
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
