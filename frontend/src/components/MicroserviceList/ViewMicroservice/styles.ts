import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 700px;
  background: #FAECEC;
  border-radius: 20px;
  padding: 20px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`

const Button = styled.button`
  border-radius: 5px;
  background: #F0DADA;
  font-weight: 600;
  border: none;
  font-size: 15px;
  height: 35px;
  padding: 5px;
  transition: all 0.2s;

  &:hover {
    background: #0a58ca;
    color: #fff;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Scrollbar = styled.div<{ length: number }>`
  height: fit-content;

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
`

const Heading = styled.div`
  display: flex;
  flex-direction: column;
`

export default {
  Button,
  Container,
  Header,
  Heading,
  Wrapper,
  Scrollbar
}

