import axios from 'axios';
import S from './styles'
import { useFormData } from 'components/MultiStepForm/Form/FormProvider';
import { useAppData } from 'helper/AppProvider';
import React from 'react';

export default function MicroserviceBlock({ name }: { name: string }) {
    const { microserviceData, setMicroserviceData } = useFormData();
    const { setAppFiles } = useAppData();

    const addMicroservice = (e: React.FormEvent) => {
        e.preventDefault();
        const microserviceList: object[] = (microserviceData["microservices"] as []) || []
        axios.post(`http://localhost:8000/microservice/add/${name}`).then(res => {
            setAppFiles(prev => [...prev, name]);
            setMicroserviceData({ "microservices": [...microserviceList.concat(...JSON.parse(res.data)["microservices"])] })
        })
    };

    return (
        <S.Container>
            {name}
            <S.Add onClick={addMicroservice}>+ Add</S.Add>
        </S.Container>);
}
