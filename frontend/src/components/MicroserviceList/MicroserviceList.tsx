import S from './styles'

import { useFormData } from 'components/MultiStepForm/Form/FormProvider'

export default function MicroserviceList() {
    const { setStep } = useFormData();
    return (
        <S.Wrapper>
            <h5>Select microservice(s)</h5>
            <S.Header>
                <span style={{ color: "#A67373", fontWeight: 300 }}>Re-use existing microservices</span>
                <S.Button onClick={() => setStep(3)}>+ Add Microservice</S.Button>
            </S.Header>
            <S.Container>
                <span style={{ color: "#907F7F", fontWeight: 500 }}>0 microservice(s) available</span>
            </S.Container>
        </S.Wrapper>
    )
}
