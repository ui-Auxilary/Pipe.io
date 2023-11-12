import { useState } from "react"
import S from './Styles'
import Button from 'react-bootstrap/Button';
import fileImg from './file-svgrepo-com.svg'



interface DownloadProps {
  pipeId: string
  output: string
}


export default function Download(props: DownloadProps) {


  const output = JSON.parse(props.output)


  const [download, setDownload] = useState("")


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
      {Object.keys(output).map((name, path) => (
        <S.Body>
          <S.Img src={fileImg} />
          <h6>{output[name]}</h6>
          <Button onClick={() => handleDownload(output[name])}>Download</Button>
        </S.Body>
      ))}
    </S.Container>
  )
}