import axios from "axios"
import { useEffect, useState } from "react"
import S from './Styles'
import Button from 'react-bootstrap/Button';
import fileImg from './file-svgrepo-com.svg'



interface DownloadProps {
  pipeId: string
  output: string
  name: string
}


export default function DownloadCSV(props: DownloadProps) {

  // const outputFiles = JSON.parse(props)

  console.log(props)

  const [files, setFiles] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/pipes/${props.pipeId}`).then(res => {
      console.log(res.data)
      for (const microservice of res.data.microservices) {
        if (microservice.name == props.name) {
          console.log("FILES", microservice.parameters.output_file_path.value.split(","))
          setFiles(microservice.parameters.output_file_path.value.split(","))
      
        }
      }
    })
  }, [props.name])


  const handleDownload = (filePath: string) => {
    const link = document.createElement('a');

    const downloadUrl = `http://localhost:8000/pipes/${props.pipeId}/download/${filePath}`;
    link.href = downloadUrl;

    link.download = filePath;
  

    link.click();
    link.remove();
  }

  return (
    <S.Container>
      {files.map((name) => (
        <S.Body>
            <S.Img src={fileImg}/>
            <h6>{name}</h6>
            <Button onClick={()=> handleDownload(name)}>Download</Button>
        </S.Body>
      ))}
    </S.Container>
  )
}