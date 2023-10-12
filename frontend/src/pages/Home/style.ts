import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #eee;
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
  background-color: #fff;
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
  overflow-y: scroll;
  &::-webkit-scrollbar {
      width: 8px;
      border: 1px solid #5a5a5a;
      border-radius: 20px;
  }
  &::-webkit-scrollbar-thumb {
      width: 5px;
      background: #5a5a5a;
      border-radius: 20px;
  }
`;

export default {
  Body,
  Container,
  Wrapper,
  Header,
};
