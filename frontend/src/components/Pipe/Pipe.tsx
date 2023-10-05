import S from './style'
import dots from 'assets/dots.svg'

export interface Props {
    id: string
    name: string
}

export default function Pipe({ id, name }: Props) {
    return (
        <S.Pipe>
            <S.Left>
                <span><S.Edit src={dots}></S.Edit></span>
                <div>
                    <h4>{name}</h4>
                    <span>#{id}</span>
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
