import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Logo from "assets/logo.svg";
import Sent from "./Secondary/Sent";
import s from "./Style";
import axios from "axios";


export default function Recovery() {

  const [values, setValues] = useState({
    email: '',
  });
  const [isSubmit, setIsSubmit] = useState(false);
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


  const requestResetLink = async () => {
    const data = new URLSearchParams();
    data.append('email', values.email);
    axios.post(`http://localhost:8000/users/forgot-password`, data)
  }


  // Handle form submission
  const handleSubmit = (event: Event) => {
    event.preventDefault();
    // Check if email is valid
    if (!validateEmail(values.email) || values.email === '') {
      seterrorMsg({ message: 'Please enter a valid email address.' })
      setValid(false)
      return;
    } else {
      setIsSubmit(true);
    }
    requestResetLink();
  }

  return (
    <>
    {!isSubmit && 
    <s.Container>
      <s.Logo src={Logo}></s.Logo>
      <s.CardContainer className="register-card">
        <s.CardHeader><h5>Forgot Password</h5></s.CardHeader>
        <s.CardBody>
          <Form className="register-form" onSubmit={handleSubmit}>
            {!valid ? <s.ErrorContainer>{errorMsg.message}</s.ErrorContainer> : null}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={handleEmailInput}
              />
              <Form.Text className="text-muted"> We'll send a reset link to your email.</Form.Text>
            </Form.Group>
            <s.ButtonContainer>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </s.ButtonContainer>
            <s.ButtonContainer>
              <Button variant="secondary" onClick={() => window.location.href="/login"}>
                Back to Login
              </Button>
            </s.ButtonContainer>
          </Form>
        </s.CardBody> 
      </s.CardContainer>
    </s.Container>}
    {isSubmit && <Sent email={values.email}/>}
    </>
  );
}