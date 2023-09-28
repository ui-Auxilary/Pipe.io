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
  background-color: #FFF;
  width: 100%;
  height: 100px;
`;

export default {
    Container,
    Wrapper,
    Header
}