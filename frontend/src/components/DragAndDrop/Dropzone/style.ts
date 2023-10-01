import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 50px;
  width: 100%;
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
  stroke: #8A8A8A;
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
  max-height: 120px;
  overflow: auto;
  text-align: justify;

  &::-webkit-scrollbar {
    width: 8px;
    border: 1px solid #5A5A5A;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    width: 5px;
    background: #5A5A5A;
    border-radius: 20px;
  }
`;

export default {
  Container,
  Wrapper,
  FileIcon,
  FileBox,
  ScrollableDiv
};
