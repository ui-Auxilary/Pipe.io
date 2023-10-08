import S from "./style";
import { Button } from "react-bootstrap";
import { useState } from "react";


import Process from 'assets/process.svg'
import Logo from "assets/logo.svg";



export default function Sidebar() {
  return (
    <S.Container>
      <S.Logo src={Logo}></S.Logo>
      <S.FeatureBlock>
        <S.Feature><S.Pipelines src={Process}></S.Pipelines>PIPELINES</S.Feature>
        <S.Feature>
          <S.UserImg src="https://i.imgur.com/MjjdkFT.png"></S.UserImg>
          <S.ButtonContainer>
            <Button variant="outline-light" onClick={() => handleLogOut()}>Log Out</Button>
          </S.ButtonContainer>
        </S.Feature>
      </S.FeatureBlock>
    </S.Container>
  );
}



function handleLogOut() {
  fetch(`http://localhost:8000/users/get_user`, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
    },
  })
    .then((res) => {
      if (res.status === 200) {
        window.location.href = "/login";
        sessionStorage.removeItem("token");
      }
    })
    .catch((error) => {
      console.log(error);
      window.location.href = "/login";
    });

}
