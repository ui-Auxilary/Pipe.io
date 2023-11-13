import styled from "styled-components";

const Header = styled.header`
  display: flex;
  background-color: ${({ theme }) => theme.header.backgroundColor};
  width: 100%;
  height: 100px;
  padding: 25px 50px;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.text};
  span {
    color: #aaa;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


export default {
  Header,
  HeaderWrapper
}