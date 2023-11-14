import styled from "styled-components";

const Container = styled.div`
  background: ${({ theme }) => theme.sidebar.backgroundColor};
  color: #fff;
  width: 10%;
  display: flex;
  flex-direction: column;
`;

const FeatureBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Feature = styled.div`
  width: 100%;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Pipelines = styled.img`
  padding: 5px;
  width: 40%;
  align-items: flex-start;
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
  Feature,
  FeatureBlock,
  Container,
  Pipelines,
  Logo,
  UserContainer,
  UserImg,
  ButtonContainer,
};
