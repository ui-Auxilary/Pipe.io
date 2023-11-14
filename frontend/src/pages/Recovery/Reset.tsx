import React, { useState, useEffect } from 'react';
import axios from 'axios';
import s from './Style';
import Logo from 'assets/logo.svg';
import { Form, Button, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Success from './Secondary/Success';
import Invalid from './Secondary/Invalid';
import { ErrorResponse } from 'types/AuthTypes';



export default function Reset() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [isValidToken, setIsValidToken] = useState(true);

  useEffect(() => {
    if (token === null) {
      window.location.href = '/';
    }
    axios.get(`http://localhost:8000/users/verify_reset_token?reset_token=${token}`)
    .then(() => (setIsValidToken(true)))
    .catch(() => (setIsValidToken(false)));
  }, []);


  const [values, setValues] = useState({
    password: '',
    password2: '',
  });

  const [errorMsg, seterrorMsg] = useState({
    message: '',
  })

  // State to check form validity
  const [valid, setValid] = useState(true)

  const [isSubmit, setIsSubmit] = useState(false);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  
  const requestReset = async () => {
    const data = new URLSearchParams();
    data.append('password', values.password);
    data.append('reset_token', token as string);
    axios.put(`http://localhost:8000/users/reset_password`, data, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      }
    }).then(() => {
      setIsSubmit(true);
    }).catch((error: ErrorResponse) => {
      seterrorMsg({ message: error.response.data.detail });
      setValid(false);
    });
  }

  // Handle form submission
  const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (values.password !== values.password2) {
      seterrorMsg({ message: 'Passwords do not match' })
      setValid(false)
    } else {
      requestReset();
    }
  }

  return (
    <>
    {isValidToken && !isSubmit && <s.Container>
      <s.Logo src={Logo}></s.Logo>
      <s.CardContainer className="register-card">
        <Card.Header><h5>Reset Password</h5></Card.Header>
        <Card.Body>
          <Form className="register-form" onSubmit={handleSubmit}>
            {!valid ? <s.ErrorContainer>{errorMsg.message}</s.ErrorContainer> : null}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <s.ButtonContainer>
              <Button variant="primary" type="submit" className="register-button">
                Reset Password
              </Button>
            </s.ButtonContainer>
          </Form>
        </Card.Body>
      </s.CardContainer>
    </s.Container>}

    {!isValidToken && <Invalid />}
    {isSubmit && <Success />}

    </>
  );

}