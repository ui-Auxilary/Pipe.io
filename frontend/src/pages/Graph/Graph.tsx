import PageTemplate from "components/PageTemplate/PageTemplate";
import Sidebar from "../../components/Sidebar";
import S from "./style";

import { useState } from "react";
import ChartComponent from "components/Visualization/Visualization";


export default function Graph(props: any) {
  return (
    <PageTemplate>
      <S.Wrapper>
        <S.Container>
          <S.Body>
            <ChartComponent stockName="AAPL" />
          </S.Body>
        </S.Container>
      </S.Wrapper>
    </PageTemplate>
  )
}
