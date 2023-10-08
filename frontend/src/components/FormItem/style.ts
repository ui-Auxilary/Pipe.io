import styled from "styled-components";

const Form = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  display: block;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
`;

const Textarea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  display: block;
  width: 100%;
  height: 100px;
  resize: none;
`

const Button = styled.button`
  width: 20%;
  height: 40px;
  border: none;
  border-radius: 5px;
  font-weight: 400;
  background-color: #6c757d;
  color: #fff;
`
const Wrapper = styled.div`
  width: 100%;
  text-align: right;
`;
export default {
  Button,
  Form,
  Input,
  Label,
  Textarea,
  Wrapper
}