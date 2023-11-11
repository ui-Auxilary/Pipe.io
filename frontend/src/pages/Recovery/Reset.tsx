import React, { useState, useEffect } from 'react';
import axios from 'axios';
import s from './Style';
import Logo from 'assets/logo.svg';
import { Form, Button, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Success from './components/Success';
import Invalid from './components/Invalid';



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
    .then((res) => {
      console.log(res);
      setIsValidToken(true);
    }).catch((err) => {
      console.log(err.response.data);
      setIsValidToken(false);
    });
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


  const handlePasswordInput = (event: Event) => {
    setValues({ ...values, password: event.target.value })
  }
  const handlePassword2Input = (event: Event) => {
    setValues({ ...values, password2: event.target.value })
  }

  // Handle form submission
  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const data = new URLSearchParams();
    if (values.password !== values.password2) {
      seterrorMsg({ message: 'Passwords do not match' })
      setValid(false)
      return;
    } else { // If passwords match
      data.append('password', values.password);
      data.append('reset_token', token as string);
    }

    axios.put("http://localhost:8000/users/reset_password", data)
    .then((res) => {
      if (res.status !== 200) {
        seterrorMsg({ message: res.detail })
        setValid(false)
      } else {
        setValid(true)
        setIsSubmit(true);
      }
    }).catch((err) => {
      console.log(err);
      setValid(false)
    });
  }

  return (
    <>
    {isValidToken && !isSubmit && <s.Container>
      <s.Logo src={Logo}></s.Logo>
      <s.CardContainer className="register-card">
        <Card.Header><h5>Reset Password</h5></Card.Header>
        <Card.Body>
          <Form className="register-form" onSubmit={handleSubmit}>
            {!valid ? <div style={{ color: 'red' }}>{errorMsg.message}</div> : null}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                onChange={handlePasswordInput}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                onChange={handlePassword2Input}
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