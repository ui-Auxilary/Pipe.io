import S from './style'
import dots from 'assets/dots.svg'
import view from 'assets/view.svg'
import ChartComponent from 'components/Visualization/Visualization'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'

export interface Props {
  id: string
  name: string
}

export default function Pipe({ id, name }: Props) {
  const [show, setShow] = useState(false);

  const onHandleClose = () => setShow(false);
  const onHandleOpen = () => setShow(true);


  return (
    <>
      <S.Pipe>
        <S.Left>
          <span><S.Edit src={dots}></S.Edit></span>
          <div>
            <S.Label>
              <h4 style={{ flex: 1 }}>{name}</h4>
              <span style={{ color: "#B6A4A4" }}>#{id}</span>
            </S.Label>
            <span style={{ fontSize: "15px" }}>Process financial data</span>
          </div>
        </S.Left>
        <div>
          <div><S.Button onClick={onHandleOpen} style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>View <S.View src={view}></S.View></S.Button></div>
          <div><S.Button>Microservices</S.Button></div>
        </div>
      </S.Pipe>
      <Modal dialogClassName="form-modal" contentClassName="modal-height" show={show} onHide={onHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Pipeline</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <ChartComponent stockName={"AAPL"}/>
          </Modal.Body>
      </Modal>
    </>
  )
}
