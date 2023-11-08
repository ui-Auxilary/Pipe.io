import styled from 'styled-components';
import { Card } from 'react-bootstrap';

const Container = styled.div`
  background: #5a279b;
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const Logo = styled.img`
  padding: 20px;
  width: 10%;
  min-width: 100px;
`;

const CardContainer = styled(Card)`
  background: #fff;
  width: 35%;
  min-width: 300px;
  min-height: 300px;
  `;

const CardHeader = styled(Card.Header)`
  width: 100%;
  display: flex;
  `;

const CardBody = styled(Card.Body)`
  width: 100%;
  display: flex;
  flex-direction: column;
  `;

const CardFooter = styled(Card.Footer)`
  background: #5a279b;
  color: #fff;
  width: 100%;
  `;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const textContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
`;



export default {
  Container,
  Logo,
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonContainer,
  textContainer
};