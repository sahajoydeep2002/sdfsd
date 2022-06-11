import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await axios
      .post("/api/auth/login", {
        email: email,
        password: password,
      })
      .catch((err) => console.log(err));

    if (res?.data.accessToken) {
      localStorage.setItem("token", res.data.accessToken);
      navigate("/");
    }
  }

  return (
    <Container>
      <Button className="mt-3 mb-3" variant="primary" href="/">❮</Button>
      <h1 className="display-4" style={{fontWeight: 800}}>Login</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e) => handleLogin(e)}>
          Login
        </Button>
      </Form>
    </Container>
  );
}
