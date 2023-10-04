import S from "./style";

import Process from 'assets/process.svg'
import Logo from "assets/logo.svg";

export default function Sidebar() {
  return (
    <S.Container>
      <S.Logo src={Logo}></S.Logo>
      <S.FeatureBlock>
        <S.Feature><S.Pipelines src={Process}></S.Pipelines>PIPELINES</S.Feature>
        <S.Feature>Account</S.Feature>
      </S.FeatureBlock>
    </S.Container>
  );
}
