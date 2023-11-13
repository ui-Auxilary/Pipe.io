import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 60px;
  background: #FAECEC;
  border-radius: 5px;
  padding: 10px;
  padding-left: 25px;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Add = styled.button`
  background: #A88F8F;
  width: 80px;
  height: 35px;
  padding: 2px;
  border-radius: 5px;
  border: none;
  color: #FFF;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #0d6efd;
  }
`;

export default {
  Add,
  Container
}

