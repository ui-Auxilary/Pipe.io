import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";
import S from './style'
import Helmet from 'react-helmet';

export default function PageTemplate(props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) {
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
