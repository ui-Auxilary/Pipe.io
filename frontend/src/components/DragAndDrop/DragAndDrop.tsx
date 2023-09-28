import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone"
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  margin: auto 500px;
  justify-content: center;
  align-items: center;
  border-style: dashed;
  border-width: 2px;
  padding: 20px;
  border-radius: 5px;
`

export default function DragAndDrop() {
  const [files, setFiles] = useState<File[]>([]);
  const [rejectedfiles, setRejectedFiles] = useState<FileRejection[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [...previousFiles, ...acceptedFiles])
    }

    console.log('here')
    if (fileRejections?.length) {
      console.log('rejected')
      setRejectedFiles(previousFiles => [...previousFiles, ...fileRejections]);
    }
  }, []);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/x-python': ['.py']
    },
    onDrop
  });

  const fileDisplay = files?.map((file) => (
    <li key={window.crypto.randomUUID()}>
      {file.name} - {file.size} bytes
    </li>
  ))

  return (
    <section className="container">
      <Container style={{ borderColor: isDragActive ? '#add8e6' : '#000' }} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag & Drop or browse</p>
      </Container>
      <aside>
        <h4>Files</h4>
        {rejectedfiles && rejectedfiles.map(file => file.errors.map(error => <li>{error.code} {error.message}</li>))}
        <ul>{fileDisplay}</ul>
      </aside>
    </section>
  )
}
