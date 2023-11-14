import s from "../Style";
import Logo from "assets/logo.svg";
import React from "react";

interface Props {
  email: string;
}

export default function Sent(props: Props) {

  return (
    <s.Container>
      <s.Logo src={Logo}></s.Logo>
      <h3>Help is on the way!</h3>
      <s.textContainer>
       <p> We've sent an email to <b>{props.email}</b> with 
        a link to reset your password if that account exists.</p>
        <p>Remember to check your spam folder too.</p>
      </s.textContainer>
    </s.Container>
    
  );

}


  