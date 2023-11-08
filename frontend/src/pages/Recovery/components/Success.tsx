import Logo from "assets/logo.svg";
import s from "../Style";
import { Button } from 'react-bootstrap';




export default function Success() {
  return (
    <s.Container>
      <s.Logo src={Logo}></s.Logo>
      <s.textContainer>
        You have successfully reset your password. You can now log in with your
        new password.
      </s.textContainer>
      <Button to="/login">Log in</Button>
    </s.Container>
  );
}