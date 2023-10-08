import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Logo from "assets/logo.svg";

import s from "./style";


export default function Register() {

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


  const handleEmailInput = (event: Event) => {
    setValues({ ...values, email: event.target.value })
  }

  const handleUsernameInput = (event: Event) => {
    setValues({ ...values, username: event.target.value })
  }

  const handlePasswordInput = (event: Event) => {
    setValues({ ...values, password: event.target.value })
  }

  const handlePassword2Input = (event: Event) => {
    setValues({ ...values, password2: event.target.value })
  }

  const validateEmail = (email: string) => {
    // Regex for email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // Handle form submission
  const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (!validateEmail(values.email)) {
      seterrorMsg({ ...errorMsg, message: 'Invalid email address' })
      setValid(false)
    } else if (values.password !== values.password2) {
      seterrorMsg({ ...errorMsg, message: 'Passwords do not match' })
      setValid(false)
    } else { // If email is valid
      const data = new URLSearchParams();
      data.append('email', values.email);
      data.append('username', values.username);
      data.append('password', values.password);

      fetch(`http://localhost:8000/users/create`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
      }).then(function (response) {
        return response.json()
      }).then(function (response) {
        // If there is an error, set the error message
        if (response.detail) {
          setValid(false)
          seterrorMsg({ message: response.detail })
          // If there is no error, set the token and redirect to home
        } else {
          sessionStorage.setItem('token', response.token)
          window.location.href = '/'
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }

  return (
    <s.Container>
      <s.Logo src={Logo}></s.Logo>
      <s.CardContainer fluid="md">
        <Card className="register-card">
          <Card.Body>
            <Form className="register-form" onSubmit={handleSubmit}>
              {!valid ? <div style={{ color: 'red' }}>{errorMsg.message}</div> : null}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={values.email}
                  onChange={handleEmailInput}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  name="username"
                  value={values.username}
                  onChange={handleUsernameInput}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handlePasswordInput}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password2"
                  value={values.password2}
                  onChange={handlePassword2Input}
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