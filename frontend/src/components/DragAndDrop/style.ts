import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-style: dashed;
  border-width: 2px;
  padding: 20px;
  border-radius: 5px;
`;

const Form = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  font-size: 20px;
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
`

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  display: block;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
`

const Textarea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  display: block;
  width: 100%;
  height: 100px;
  resize: none;

  &:focus {
    border: 1px solid #fff;
  }
`
const Wrapper = styled.div`
  padding: 0 25px;
`

export default {
  Container,
  Form,
  Label,
  Input,
  Textarea,
  Wrapper
};
