import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Logo from "assets/logo.svg";
import React from "react";
import axios from "axios";
import { RegisterResponse, ErrorResponse } from "types/AuthTypes";

import s from "./style";

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    username: '',
    password: '',
    password2: '',
  });


  const [errorMsg, seterrorMsg] = useState({
    message: '',
  })

  // State to check form validity
  const [valid, setValid] = useState(true)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const validateEmail = (email: string) => {
    // Regex for email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


  const requestRegister = async () => {
    const data = new URLSearchParams();
    data.append('email', values.email);
    data.append('password', values.password);
    axios.post(`http://localhost:8000/users/login`, data, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      }
    }).then((response: RegisterResponse) => {
      sessionStorage.setItem('token', response.data.token);
      window.location.href = '/';
    }).catch((error: ErrorResponse) => {
      seterrorMsg({ ...errorMsg, message: error.response.data.detail });
      setValid(false);
    });
  }


  // Handle form submission
  const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (!validateEmail(values.email)) {
      seterrorMsg({ ...errorMsg, message: 'Invalid email address' })
      setValid(false)
    } else { 
      requestRegister();
    }
  }

  return (
    <s.Container>
      <s.Logo src={Logo}></s.Logo>
      <s.CardContainer fluid="md">
        <Card className="register-card">
          <Card.Body>
            <Form className="register-form" onSubmit={handleSubmit}>
              {!valid ? <s.ErrorContainer>{errorMsg.message}</s.ErrorContainer> : null}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={values.email}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <a href="/recovery">Forgot password?</a>
              <s.ButtonContainer>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </s.ButtonContainer>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">
            Don't have an account? <a href="/register">Register</a>
          </Card.Footer>
        </Card>
      </s.CardContainer>
    </s.Container>
  );
}