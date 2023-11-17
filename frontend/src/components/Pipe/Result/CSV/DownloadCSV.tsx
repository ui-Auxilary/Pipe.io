import axios from "axios"
import { useEffect, useState } from "react"
import S from './Styles'
import Button from 'react-bootstrap/Button';
import fileImg from './file-svgrepo-com.svg'
import { CSVDownloadProps } from "types/PipeTypes"





export default function DownloadCSV(props: CSVDownloadProps) {

  const [files, setFiles] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/pipes/${props.pipeId}`).then((res: any) => {
      for (const microservice of res.data.microservices) {
        if (microservice.name == props.name) {
          if (microservice.parameters.output_file_path.value != null) {
            setFiles(microservice.parameters.output_file_path.value.split(","))
          } else if (microservice.parameters.output_file_path.default != null) {
            setFiles(microservice.parameters.output_file_path.default.split(","))
          }
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
      {files.map((name: string) => (
        <S.Body>
          <S.Img src={fileImg} />
          <h6>{name}</h6>
          <Button onClick={() => handleDownload(name)}>Download</Button>
        </S.Body>
      ))}
    </S.Container>
  )
}