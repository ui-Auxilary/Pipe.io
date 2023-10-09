import { useFormData } from 'components/Form/FormProvider'
import S from './styles'
import axios from "axios";
import { useEffect, useState } from 'react'
import Microservice from 'components/Microservice';

export default function ViewMicroservice() {
    const [microservice, setMicroservices] = useState({});
    const { microserviceData, setMicroserviceData } = useFormData()
    const { microservices, parent_file } = microserviceData

    let len = 0;
    if (microservices) {
        len = microservices.length
    }


    useEffect(() => {
        if (microservices) {
            microservices.map(({ code, doc, name, parameters }) => {
                console.log(code, doc)
                console.log("hie")
                axios.post('http://localhost:8000/microservice/add', { "name": name, "parameters": parameters, "parent_file": parent_file, "code": code, "docstring": doc })
                return <Microservice code={code} docstring={doc} name={name} param={parameters} parent_file={parent_file} />
            })
        }
    }, [microservices])


    return (
        <S.Wrapper>
            <h5>Edit microservices</h5>
            <S.Container>
                <span style={{ color: "#907F7F", fontWeight: 500 }}>Found {len} microservice(s)</span>
                {microservices && microservices.map(({ code, doc, name, parameters }) => {

                    return <Microservice code={code} docstring={doc} name={name} param={parameters} parent_file={parent_file} />
                })}
            </S.Container>
        </S.Wrapper>
    )
}
