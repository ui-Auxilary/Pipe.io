import { useFormData } from 'components/MultiStepForm/Form/FormProvider'
import S from './styles'
import axios from "axios";
import { useEffect, useState } from 'react'
import Microservice from 'components/Microservice';

export default function ViewMicroservice() {
    const { microserviceData } = useFormData()
    const { microservices } = microserviceData

    let len = microservices ? (microservices as []).length : 0
    return (
        <S.Wrapper>
            <h5>Edit microservices</h5>
            <S.Container>
                <span style={{ color: "#907F7F", fontWeight: 500 }}>Found {len} microservice(s)</span>
                <S.Scrollbar>
                    {microservices && microservices.map(({ code, doc, name, parameters, parent_file }, index) => {
                        console.log('hey loop')
                        return <Microservice code={code} docstring={doc} name={name} param={parameters} parent_file={parent_file} />
                    })}
                </S.Scrollbar>
            </S.Container>
        </S.Wrapper>
    )
}
