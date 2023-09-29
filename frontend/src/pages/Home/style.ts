import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #EEE;
  height: 100vh;
  width: 100%;
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  background-color: #FFF;
  width: 100%;
  height: 100px;
  padding: 25px;

  span {
    color: #aaa;
  }
`;

const Body = styled.div`
  padding: 25px;
  font-size: 18px;
  font-weight: 500;
`;

export default {
  Body,
  Container,
  Wrapper,
  Header
}