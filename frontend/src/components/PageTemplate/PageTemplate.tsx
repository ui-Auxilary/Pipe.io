import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";
import S from './style'

export default function PageTemplate(props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) {
  return (
    <S.Container>
        <div>{props.children}</div>
    </S.Container>
  )
}
