import { ReactNode } from 'react';
import S from './style'
import Helmet from 'react-helmet';

export default function PageTemplate(props: { children: ReactNode }) {
  return (
    <S.Container>
      <Helmet>
        <title>Pipe.io</title>
        <meta name="description" content="pipe.io, microservices" />
      </Helmet>
      <div>{props.children}</div>
    </S.Container>
  )
}
