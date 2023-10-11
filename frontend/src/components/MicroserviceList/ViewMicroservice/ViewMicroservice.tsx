import { useFormData } from 'components/Form/FormProvider'
import S from './styles'
import axios from "axios";
import { useEffect, useState } from 'react'
import Microservice from 'components/Microservice';

export default function ViewMicroservice() {
    const [microserviceIds, setMicroserviceIds] = useState<string[]>([]);
    const { microserviceData, setMicroserviceData } = useFormData()
    const { microservices } = microserviceData

    let len = 0;
    if (microservices) {
        len = microservices.length
    }

    console.log('HELLO', microservices)

    useEffect(() => {
        if (microservices) {
            microservices.map(({ code, doc, name, parameters, parent_file }) => {
                console.log(code, doc)
                console.log("hie")
                axios.post('http://localhost:8000/microservice/add', { "name": name, "parameters": parameters, "parent_file": parent_file, "code": code, "docstring": doc }).then(res => setMicroserviceIds(prev => [...prev, JSON.parse(res.data).id]))
            })
        }
    }, [microservices])


    return (
        <S.Wrapper>
            <h5>Edit microservices</h5>
            <S.Container>
                <span style={{ color: "#907F7F", fontWeight: 500 }}>Found {len} microservice(s)</span>
                {microservices && microservices.map(({ code, doc, name, parameters, parent_file }, index) => {

                    return <Microservice id={microserviceIds[index]} code={code} docstring={doc} name={name} param={parameters} parent_file={parent_file} />
                })}
            </S.Container>
        </S.Wrapper>
    )
}
