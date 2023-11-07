import { useFormData } from 'components/MultiStepForm/Form/FormProvider'
import S from './styles'
import axios from "axios";
import { useEffect, useState } from 'react'
import Microservice from 'components/Microservice';
import { useAppData } from 'helper/AppProvider';

export default function ViewMicroservice() {
    const { setMicroserviceData, microserviceData, setStep } = useFormData()

    const [loading, setLoading] = useState(true);
    const [microservices, setMicroservices] = useState<object[]>([]);
    const { appfiles } = useAppData();

    const readFiles = async (files: File[], filetype) => {
        console.log('HERE', filetype)
        let microservices: object[] = [];
        files?.map((file) => {
            console.log('FILE', file.name, filetype)
            if (filetype == "python") {
                console.log('READING PYTHON')
                const reader = new FileReader();
                reader.readAsBinaryString(file)
                reader.onload = async () => {
                    const base64data = reader.result;

                    if (base64data) {
                        console.log('Data found setting for', file.name, microserviceData)
                        await axios.post('http://localhost:8000/upload', { 'filename': file.name, 'content': base64data }).then((res) => {
                            setMicroserviceData(prev => prev.concat(JSON.parse(res.data)['microservices']))
                        })
                    }
                };
            }

            if (filetype == "csv") {

                const reader = new FileReader();
                reader.readAsText(file)
                reader.onload = async () => {
                    const base64data = reader.result;

                    console.log('POSTING', base64data)
                    if (base64data) {
                        await axios.post('http://localhost:8000/upload_csv', { 'filename': file.name, 'content': base64data })
                    }
                };
            }

        })
        console.log('SUBMIT THESE', microservices)
    }

    const loadMicroservices = async (filetype) => {
        try {



            await readFiles(appfiles, filetype);

            console.log('APP DATA', microserviceData)
            // // const res = await 
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {

        console.log('##Microsevices', microserviceData, microservices)

    }, [microserviceData])

    useEffect(() => {
        const filetype = appfiles && appfiles.pop();
        loadMicroservices(filetype);
    }, [appfiles])

    let len = microserviceData ? microserviceData.length : 0
    return loading ? (<p>Loading</p>) : (
        <S.Wrapper>
            <S.Header>
                <h5>Edit microservices</h5>
                <S.Button onClick={() => setStep(2)}>+ Add Microservice</S.Button>
            </S.Header>
            <S.Container>
                <span style={{ color: "#907F7F", fontWeight: 500 }}>Found {len} microservice(s)</span>
                <S.Scrollbar length={len}>
                    {microserviceData && microserviceData.map(({ code, doc, name, parameters, parent_file, output_type }) => {
                        console.log('hey loop')
                        return <Microservice code={code} docstring={doc} name={name} param={parameters} parent_file={parent_file} from_pipe={false} output_type={output_type} />
                    })}
                </S.Scrollbar>
            </S.Container>
        </S.Wrapper>
    )
}
