import S from './style'
import dots from 'assets/dots.svg'

export default function Pipe() {
    return (
        <S.Pipe>
            <S.Left>
                <span><S.Edit src={dots}></S.Edit></span>
                <div>
                    <h4>My pipeline</h4>
                    <span>#001</span>
                    <span>Process financial data</span>
                </div>
            </S.Left>
            <div>
                <div><S.Button>View <S.Edit></S.Edit></S.Button></div>
                <div><S.Button>Microservices</S.Button></div>
            </div>
        </S.Pipe>
    )
}
