import S from './style';

import Logo from 'assets/logo.svg';

export default function Sidebar() {
  return (
    <S.Container>
      <S.Logo src={Logo}></S.Logo>
    </S.Container>
  )
}
