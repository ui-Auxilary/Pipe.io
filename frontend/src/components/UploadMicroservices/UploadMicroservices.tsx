import Dropzone from 'components/Dropzone'
import S from './styles'
import MicroserviceBlock from './MicroserviceBlock'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useFormData } from 'components/MultiStepForm/Form/FormProvider'

export default function UploadMicroservices() {
    const [microserviceList, setMicroserviceList] = useState([])
    const { setMicroserviceData } = useFormData();

    useEffect(() => {
        // Load in microservices
        let pythonRegex = /^[^_].*.py$/;
        axios.get(`http://localhost:8000/microservice/list`).then(res => { console.log("RES", res.data); setMicroserviceList(res.data.filter((filename: string) => pythonRegex.test(filename))) })
        setMicroserviceData({})
    }, [])

    return (
        <S.Wrapper>
            <div>
                <S.Label>Upload microservice file(s)</S.Label>
                <Dropzone upload={true} filetype={'python'} />
            </div>
            <div>
                <S.Label>Add previously uploaded file(s)</S.Label>
                <S.UploadBlock>
                    {microserviceList && microserviceList.map(microserviceName =>
                        <MicroserviceBlock name={microserviceName} />
                    )}
                </S.UploadBlock>
            </div>
        </S.Wrapper>
    )
}
