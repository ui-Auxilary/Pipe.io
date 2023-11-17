import Dropzone from 'components/Dropzone'
import S from './styles'
import MicroserviceBlock from './MicroserviceBlock'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useFormData } from 'components/MultiStepForm/Form/FormProvider'
import { useAppData } from 'helper/AppProvider'

export default function UploadMicroservices() {
    const [added, setAdded] = useState<string[]>([])
    const [microserviceList, setMicroserviceList] = useState([])
    const [prevList, setPrevMicroservices] = useState<any[]>([])
    const { setMicroserviceData, microserviceData } = useFormData();
    const { prevFiles } = useAppData();

    useEffect(() => {
        // Load in microservices
        let pythonRegex = /^[^_].*.py$/;
        axios.get(`http://localhost:8000/microservice/list`).then(res => { setMicroserviceList(res.data.filter((filename: string) => pythonRegex.test(filename))) })
        setMicroserviceData({})
        setPrevMicroservices([])
        prevFiles.map(name => {
            axios.post(`http://localhost:8000/microservice/add/${name}`).then(res => {
                setPrevMicroservices(prev => [...prev.concat(...JSON.parse(res.data)["microservices"])])
            })
        })
    }, [])

    useEffect(() => {
        setMicroserviceData({ "microservices": [...prevList] })
    }, [prevList])

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
                        <MicroserviceBlock name={microserviceName} isAdded={prevFiles.includes(microserviceName)} />
                    )}
                </S.UploadBlock>
            </div>
        </S.Wrapper>
    )
}
