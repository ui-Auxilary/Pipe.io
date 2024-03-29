import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 50px;
  width: 500px;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FileIcon = styled.img`
  width: 25%;
  display: block;
  stroke: #8a8a8a;
`;

const FileBox = styled.div`
  width: 100%;
  display: block;
  margin: 0;
  padding: 10px;
  display: flex;
`;

const ScrollableDiv = styled.div`
  margin: 5px;
  padding: 5px;
  overflow: auto;
  text-align: justify;

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

const Erase = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  color: #fff;
  font-weight: 600;
  background: #404040;
`;
export default {
  Container,
  Erase,
  Wrapper,
  FileIcon,
  FileBox,
  ScrollableDiv,
};
