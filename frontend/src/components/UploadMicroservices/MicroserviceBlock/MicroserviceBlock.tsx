import axios from 'axios';
import S from './styles'
import { useFormData } from 'components/MultiStepForm/Form/FormProvider';
import { useAppData } from 'helper/AppProvider';
import { useState } from 'react';

export default function MicroserviceBlock({ name, isAdded }: { name: string, isAdded: boolean }) {
    const { microserviceData, setMicroserviceData } = useFormData();
    const { setPrevFiles } = useAppData();
    const [, setAdded] = useState(isAdded);

    const addMicroservice = () => {
        setAdded(true);
        const microserviceList: object[] = (microserviceData["microservices"] as []) || []
        axios.post(`http://localhost:8000/microservice/add/${name}`).then(res => {
            setPrevFiles(prev => [...prev, name]);
            setMicroserviceData({ "microservices": [...microserviceList.concat(...JSON.parse(res.data)["microservices"])] })
        })
    };

    return (
        <S.Container>
            {name}
            <S.Add $added={isAdded} onClick={(e) => { e.preventDefault(); addMicroservice() }} disabled={isAdded}>{isAdded ? ("Added") : ("+ Add")}</S.Add>
        </S.Container>);
}
