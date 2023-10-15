import Pipe from "components/Pipe"
import axios from 'axios';

import S from './style'
import { useEffect, useState } from "react";
import { useAppData } from "helper/AppProvider";
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
    const { pipeIds } = useAppData();

    useEffect(() => {
        axios.get('http://localhost:8000/pipes/list', {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then(res => {
            console.log("PIPES", res.data)
            setPipes(res.data)
        }).catch(err => console.log(err))
    }, [pipeIds])

    return (
        <S.Container>
            {pipes.map(({ pipe_id, name, description }, index) => (
                <Pipe key={pipe_id} pipeId={pipe_id} id={`00${index + 1} `} name={name} description={description} />
            ))}
        </S.Container>
    )
}
