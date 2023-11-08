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
        console.log('PIPEID', pipeId)
        axios.get(`http://localhost:8000/pipes/${pipeId}`).then(res => {

            setMicroservices(res.data.microservices)
        })

    }, [])
    const len = microservices ? (microservices as []).length : 0

    useEffect(() => {
        console.log('###MICRO', microservices)
    }, [microservices])
    return (
        <S.Wrapper>
            <h5>Edit microservices</h5>
            <S.Container>
                <span style={{ color: "#907F7F", fontWeight: 500 }}>Found {len} microservice(s)</span>
                <S.Scrollbar length={len}>
                    {microservices && microservices.map(({ code, doc, name, parameters, parent_file, output_type }, index) => {
                        return <Microservice code={code} docstring={doc} name={name} param={parameters} parent_file={parent_file} from_pipe={true} parent_pipe_id={pipeId} output_type={output_type} />
                    })}
                </S.Scrollbar>
            </S.Container>
        </S.Wrapper>
    )
}
