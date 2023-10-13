import styled from "styled-components";

const Container = styled.div`
  background: #5a279b;
  color: #fff;
  width: 10%;
  display: flex;
  align-items: flex-start;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
`;

const Logo = styled.img`
  padding: 20px;
  width: 100%;
`;

const UserContainer = styled.div`
  color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserImg = styled.img`
  max-width: 80%;
  border-radius: 50%;
  padding: 20px;

`;

const ButtonContainer = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;


export default {
  Container,
  Logo,
  UserContainer,
  UserImg,
  ButtonContainer,
};
