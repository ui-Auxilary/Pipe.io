import S from './style'
import dots from 'assets/dots.svg'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { JsonToTable } from "react-json-to-table";

import Overlay from 'react-bootstrap/Overlay';
import Content from './Content'
import axios from 'axios'

export interface Props {
  pipeId: string
  id: string
  name: string
  description?: string
}


export interface ExecuteProps {
  time: number,
  result: object
}

const handleStatus = (status: string) => {
  switch (status) {
    case "Ready":
      return "Run"
    case "Completed":
      return "View Results"
    case "Error":
      return "Retry"
    default:
      return status
  }
}

export default function Pipe({ pipeId, id, name, description }: Props) {
  const [show, setShow] = useState(false);
  const [showChart, setChart] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [executed, setExecuted] = useState<ExecuteProps>();

  const handleChartClose = () => setChart(false);
  const handleChartShow = () => setChart(true);

  const onPipeRun = () => {
    if (status === "Completed") {
      handleChartShow()
    }
    else {
      setStatus("Running")
      axios.post('http://localhost:8000/pipes/execute/', null, { params: { id: pipeId } })
        .then(res => {
          setStatus("Completed")
          setExecuted({ "time": Date.now(), "result": res.data })
        })
        .catch(e => {
          setStatus("Error");
          console.log(e);
        })
    }
  }

  const onEditClick = () => {

  }

  return (
    <>
      <S.Pipe>
        <S.Top>
          <S.Left>
            <span><S.Edit onClick={onEditClick} src={dots}></S.Edit></span>
            <div>
              <Content id={id} name={name} description={description} />
            </div>
          </S.Left>
          <div>
            <div style={{ marginRight: "15px" }}>
              <S.Execute disabled={status == "Running"} onClick={onPipeRun} status={status}>{handleStatus(status)}</S.Execute>
            </div>
          </div>
        </S.Top>
        <S.Bottom>
          <S.Status status={status}>{status.toUpperCase()}</S.Status>
          <S.Label>Last executed: {executed ? executed.time : "Never"}</S.Label>
        </S.Bottom>
      </S.Pipe>
      <Modal dialogClassName="form-modal" show={showChart} onHide={handleChartClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal>
    </>
  )
}
