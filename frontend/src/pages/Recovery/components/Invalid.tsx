import React from 'react';
import Logo from 'assets/logo.svg';
import s from '../Style';
import Button from 'react-bootstrap/Button';



export default function Invalid() {
  return (
    <s.Container>
      <s.Logo src={Logo}></s.Logo>
      <h3>Invalid Reset Link</h3>
      <s.textContainer>
        The reset link has expired or is invalid.
      </s.textContainer>
      <Button href="/recovery">Request a new link</Button>
    </s.Container>
  );
}