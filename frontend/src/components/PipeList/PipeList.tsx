import Pipe from "components/Pipe"
import S from './style'
export interface Microservice {
    microserviceId: string
    content: string
    userId: string
    pipeId: string
}

export interface Pipe {
    name: string
    description: string
    userId: string
    microservices: Microservice[]
}

export default function PipeList() {
    return (
        <S.Container>
            <Pipe />
            <Pipe />
        </S.Container>
    )
}
