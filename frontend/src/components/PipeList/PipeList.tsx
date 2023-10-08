import Pipe from "components/Pipe"
import axios from 'axios';

import S from './style'
import { useEffect, useState } from "react";
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
    const [pipes, setPipes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/pipes/list')
            .then(res => setPipes(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <S.Container>
            {pipes.map(({ id, name }, index) => (
                <Pipe key={id} id={`00${index + 1} `} name={name} />
            ))}
        </S.Container>
    )
}
