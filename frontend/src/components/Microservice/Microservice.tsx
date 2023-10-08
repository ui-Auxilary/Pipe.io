import S from './styles'
import view from 'assets/view.svg'

export default function Microservice() {
  return (
    <S.Microservice>
      <S.Left>
        <div>
          <S.Label>
            <h5 style={{ flex: 1 }}>Test</h5>
            <span style={{ color: "#B6A4A4" }}>#001</span>
          </S.Label>
          <span style={{ fontSize: "15px" }}>Process financial data</span>
        </div>
      </S.Left>
      <div>
        <div><S.Button style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>Code <S.View src={view}></S.View></S.Button></div>
      </div>
    </S.Microservice>
  )
}