import PageTemplate from "components/PageTemplate/PageTemplate";
import S from "./style";

import ChartComponent from "components/Visualization/Visualization";


export default function Graph() {
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
