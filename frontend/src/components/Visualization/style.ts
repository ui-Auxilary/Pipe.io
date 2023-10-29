import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
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

const GraphContainer = styled.div`
  width: 1500px; 
  height: 600px; 

  /* Media query for smaller screens */
  @media (max-width: 1900px) {
    width: 1000px; 
  }

  /* Media query for smaller screens */
  @media (max-width: 1500px) {
    width: 750px; 
  }

  /* Media query for even smaller screens */
  @media (max-width: 480px) {
    width: 500px; 
  }
  margin-right: 10px;
`;

const CalendarContainer = styled.div`
  width: 275px; 
`;



export default {
  Container,
  Logo,
  UserContainer,
  UserImg,
  ButtonContainer,
  GraphContainer,
  CalendarContainer
};
