import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Logo from "assets/logo.svg";
import axios from "axios";
import React from "react";
import { RegisterResponse } from "types";

import s from "./style";

export default function Register() {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    message: "",
  });

  const [valid, setValid] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const requestRegister = async () => {
    const data = new URLSearchParams();
    data.append("email", values.email);
    data.append("username", values.username);
    data.append("password", values.password);

    axios.post(`http://localhost:8000/users/create`, data, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      }).then((response: RegisterResponse) => {
        if (response.data.detail) {
          setValid(false);
          setErrorMsg({ message: response.data.detail });
        } else {
          sessionStorage.setItem("token", response.data.token);
          window.location.href = "/";
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateEmail(values.email)) {
      setErrorMsg({ message: "Invalid email address" });
      setValid(false);
    } else if (values.password !== values.password2) {
      setErrorMsg({ message: "Passwords do not match" });
      setValid(false);
    } else {
      requestRegister();
   }
  };

  return (
    <s.Container>
      <s.Logo src={Logo} />
      <s.CardContainer fluid="md">
        <Card className="register-card">
          <Card.Body>
            <Form className="register-form" onSubmit={handleSubmit}>
              {!valid && (
                <s.ErrorContainer>{errorMsg.message}</s.ErrorContainer>
              )}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={values.email}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicUserName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  name="username"
                  value={values.username}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password2"
                  value={values.password2}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <s.ButtonContainer>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </s.ButtonContainer>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">
            Already have an account? <a href="/login">Login</a>
          </Card.Footer>
        </Card>
      </s.CardContainer>
    </s.Container>
  );
}