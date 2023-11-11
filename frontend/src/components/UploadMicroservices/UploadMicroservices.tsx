import Dropzone from 'components/Dropzone'
import S from './styles'
import MicroserviceBlock from './MicroserviceBlock'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function UploadMicroservices() {
    const [microserviceList, setMicroserviceList] = useState([])

    useEffect(() => {
        // Load in microservices
        axios.get(`http://localhost:8000/microservice/list`).then(res => { console.log("RES", res.data); setMicroserviceList(res.data) })
    }, [])

    return (
        <S.Wrapper>
            <div>
                <S.Label>Upload microservice file(s)</S.Label>
                <Dropzone type={'upload'} filetype={'python'} />
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
