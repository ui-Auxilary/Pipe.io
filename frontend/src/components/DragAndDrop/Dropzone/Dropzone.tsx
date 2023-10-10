import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

import File from "assets/upload_file.svg";

import S from "./style";
import axios from "axios";
import { useFormData } from "components/Form/FormProvider";


export default function Dropzone({ filetype }) {
  const [files, setFiles] = useState<File[]>([]);
  const [rejectedfiles, setRejectedFiles] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [...previousFiles, ...acceptedFiles]);

      }

      if (fileRejections?.length) {
        setRejectedFiles((previousFiles) => [
          ...previousFiles,
          ...fileRejections,
        ]);
      }
    },
    [],
  );

  let acceptedMime = {}

  acceptedMime = (filetype === "python") ? {
    "text/x-python": [".py"]
  } : {
    "text/csv": [".csv"]
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedMime,
    onDrop,
  });

  const { setMicroserviceData, microserviceData } = useFormData()

  const fileDisplay = files?.map((file) => {
    return (<S.FileBox key={window.crypto.randomUUID()}>
      <S.FileIcon
        style={{ width: "12%", marginRight: "5px", marginTop: "-10px" }}
        src={File}
      />
      <p>
        <strong>{file.name}</strong>
        <br />
        <span style={{ color: "#aaa" }}>{file.size} bytes</span>
      </p>
    </S.FileBox>)
  });

  useEffect(() => {
    return () => {
      if (files && filetype == "python") {
        files?.map((file) => {
          console.log('FILE', file.name)
          if (filetype == "python") {
            var reader = new FileReader();
            reader.readAsBinaryString(file)
            reader.onload = () => {
              let base64data = reader.result;

              if (base64data) {
                axios.post('http://localhost:8000/upload', { 'filename': file.name, 'content': base64data }).then((res) => setMicroserviceData(Object.assign(JSON.parse(res.data))))
              }
            };
          }

        })
      }
    }
  }, [files])

  return (
    <>
      <S.Container
        style={{ background: isDragActive ? "#ededed" : "#FFE3E3" }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <S.Wrapper>
          <S.FileIcon src={File} />
          <h6>
            Drag & Drop or{" "}
            <div
              style={{
                cursor: "pointer",
                color: "#5f7cce",
                textAlign: "center",
              }}
            >
              <strong>browse</strong>
            </div>
          </h6>
        </S.Wrapper>
      </S.Container>
      <aside style={{ width: "500px" }}>
        {fileDisplay.length > 0 ? (
          <S.ScrollableDiv>{fileDisplay}</S.ScrollableDiv>
        ) : null}

        {rejectedfiles &&
          rejectedfiles.map((file) =>
            file.errors.map((error) => (
              <ul>
                {error.code} {error.message}
              </ul>
            )),
          )}
      </aside>
    </>
  );
}
