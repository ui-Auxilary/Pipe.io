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
  color: #fff;
  width: 50%;
  min-width: 250px;
  `;
const CardHeader = styled(Card.Header)`
  background: #5a279b;
  color: #fff;
  width: 100%;
  `;
const CardBody = styled(Card.Body)`
  background: #5a279b;
  color: #fff;
  width: 100%;
  `;
const CardFooter = styled(Card.Footer)`
  background: #5a279b;
  color: #fff;
  width: 100%;
  `;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  ButtonContainer
};