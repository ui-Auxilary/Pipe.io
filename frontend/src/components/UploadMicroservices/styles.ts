import styled from "styled-components";

const Container = styled.div`
  height: 550px;
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
  padding: 5px 10px;
  transition: all 0.2s;

  &:hover {
    background: #0a58ca;
    color: #fff;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-around;
`

const UploadBlock = styled.div`
  border-radius: 25px;
  border: 2px solid #C2AAAA;
  padding: 25px;
  overflow: auto;
  min-width: 500px;
  height: 600px;
`

const Label = styled.label`
  font-size: 20px;
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
`;

export default {
  Button,
  Container,
  Header,
  Label,
  Wrapper,
  UploadBlock
}

