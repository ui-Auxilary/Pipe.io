import { ReactNode } from "react";
import S from "./style";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function PageTemplate(props: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <S.Container>
        <Helmet>
          <title>Pipe.io</title>
          <meta name="description" content="pipe.io, microservices" />
        </Helmet>
        <div>{props.children}</div>
      </S.Container>
    </HelmetProvider>
  );
}
