import S from "./style";
import { Button } from "react-bootstrap";
import Process from 'assets/process.svg'
import Logo from "assets/logo.svg";
import { useState } from "react";
import getUser from "helper/functions";



export default function Sidebar() {

  const [user, setUser] = useState('')
  getUser().then(({ user }) => {
    setUser(JSON.parse(user).username)
  })

  return (
    <S.Container>
      <S.Logo src={Logo}></S.Logo>
      <S.FeatureBlock>
        <S.Feature><S.Pipelines src={Process}></S.Pipelines>PIPELINES</S.Feature>
        <S.Feature>
             {user}  
          <S.ButtonContainer>
            <Button variant="outline-light" onClick={() => handleLogOut()}>Log Out</Button>
          </S.ButtonContainer>
        </S.Feature>
      </S.FeatureBlock>
    </S.Container>
  );
}



function handleLogOut() {
  fetch(`http://localhost:8000/users/logout`, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
    },
    }).then((res: Response) => {
        if (res.status === 200) {
          window.location.href = "/login";
          sessionStorage.removeItem("token");
        }
      }).catch(() => {
        window.location.href = "/login";
    });

}
