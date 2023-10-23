import S from './styles'
import axios from "axios";
import { useEffect, useState } from 'react'
import Microservice from 'components/Microservice';

interface Props {
    pipeId: string
  }

export default function ViewMicroserviceFromPipe({ pipeId }: Props) {
    const [microservices, setMicroservices] = useState([]);

    useEffect(() => {
        console.log(pipeId)
        axios.get(`http://localhost:8000/pipes/${pipeId}`).then(res => {
            
            setMicroservices(res.data.microservices)
        })

    }, [])
    console.log("THE MICROSERVIERSASD", microservices)
    let len = microservices ? (microservices as []).length : 0
    return (
        <S.Wrapper>
            <h5>Edit microservices</h5>
            <S.Container>
                <span style={{ color: "#907F7F", fontWeight: 500 }}>Found {len} microservice(s)</span>
                <S.Scrollbar>
                    {microservices && microservices.map(({ code, doc, name, parameters, parent_file }, index) => {
                        return <Microservice code={code} docstring={doc} name={name} param={parameters} parent_file={parent_file} from_pipe={true} />
                    })}
                </S.Scrollbar>
            </S.Container>
        </S.Wrapper>
    )
}
