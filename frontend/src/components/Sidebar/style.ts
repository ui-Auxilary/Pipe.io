import styled from "styled-components";

const Container = styled.div`
  background: #5a279b;
  color: #fff;
  width: 10%;
  display: flex;
  flex-direction: column;
`;

const FeatureBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Feature = styled.div`
  width: 100%;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Pipelines = styled.img`
  padding: 5px;
  width: 40%;
`;

const Logo = styled.img`
  padding: 20px;
  width: 100%;
`;

export default {
  Feature,
  FeatureBlock,
  Container,
  Pipelines,
  Logo,
};
