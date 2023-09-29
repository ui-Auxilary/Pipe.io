import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone"

import S from './style';

export default function DragAndDrop() {
  const [files, setFiles] = useState<File[]>([]);
  const [rejectedfiles, setRejectedFiles] = useState<FileRejection[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [...previousFiles, ...acceptedFiles])
    }

    if (fileRejections?.length) {
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
      <S.Container style={{ borderColor: isDragActive ? '#add8e6' : '#000' }} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag & Drop or browse</p>
      </S.Container>
      <aside>
        <h4>Files</h4>
        <ul>{fileDisplay}</ul>
        <h4>Rejected files</h4>
        {rejectedfiles &&
          rejectedfiles.map(file =>
            file.errors.map(error => <ul>{error.code} {error.message}</ul>)
          )
        }
      </aside>
    </section>

  )
}