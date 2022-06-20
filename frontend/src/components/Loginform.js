import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button } from "react-bootstrap";
import { errorToast } from "./customToast";
import { useNavigate } from "react-router-dom";

import "../css/login.css";

export default function Loginform() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate("");

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_API}/api/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 200) {
      console.log("success");
      return navigate("/");
    }
    const json = await res.json();
    errorToast(json.message);
  };

  return (
    <div className="container">
      <div className="formContainer">
        <Form>
          <h1>Login</h1>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={onUsernameChange}
              className="inputField"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={onPasswordChange}
              className="inputField"
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
