  import { useState } from "react";
  import { Form, Button, Card } from "react-bootstrap";
  import Logo from "assets/logo.svg";

  import s from "./Style";


  export default function Recovery() {

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

  const validateEmail = (email: string) => {
    // Regex for email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // Handle form submission
  const handleSubmit = (event: Event) => {

  }

  return (
    <s.Container>
      <s.Logo src={Logo}></s.Logo>
        <Card className="register-card">
          <Card.Header><h5>Forgot Password</h5></Card.Header>
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
                <Form.Text className="text-muted"> We'll send a verification code to your email. </Form.Text>
              </Form.Group>
              <s.ButtonContainer>
                <Button variant="primary" type="submit">
                  Next
                </Button>
              </s.ButtonContainer>
              <s.ButtonContainer>
                <Button variant="secondary" onClick={() => window.location.href="/login"}>
                  Back
                </Button>
              </s.ButtonContainer>
            </Form>
          </Card.Body>
        </Card>
    </s.Container>
  );
  }