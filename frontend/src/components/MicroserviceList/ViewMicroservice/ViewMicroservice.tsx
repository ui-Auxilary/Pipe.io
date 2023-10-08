import { useFormData } from 'components/Form/FormProvider'
import S from './styles'
import { useState } from 'react'
import Microservice from 'components/Microservice';

export default function ViewMicroservice() {
    const [microservice, setMicroservices] = useState({});
    const { microserviceData } = useFormData()
    const { microservices } = microserviceData

    let len = 0;
    if (microservices) {
        len = microservices.length
    }
    return (
        <S.Wrapper>
            <h5>Edit microservices</h5>

            <S.Container>
                <span style={{ color: "#907F7F", fontWeight: 500 }}>Found {len} microservice(s)</span>
                {microservices && microservices.map(({ code, doc, name, parameters }) => {
                    console.log(code, doc)
                    return <Microservice code={code} doc={doc} name={name} param={parameters} />
                }
                )}
            </S.Container>
        </S.Wrapper>
    )
}
