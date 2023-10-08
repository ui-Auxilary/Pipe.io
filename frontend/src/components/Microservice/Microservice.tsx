import S from './styles'
import view from 'assets/view.svg'
import Form from 'components/Form';
import { useState } from 'react';

import { Modal } from 'react-bootstrap';

export default function Microservice({ code, name, doc, param }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const items = param && param.map((el) => (
    { label: el, "type": "text" }
  ))

  console.log('ITEMS', items)

  const questionsList = [
    {
      section: 1,
      items: items
    }
  ]
  return (
    <>
      <S.Microservice>
        <S.Left>
          <div>
            <S.Label>
              <h5 style={{ flex: 1 }}>{name}</h5>
              <span style={{ color: "#B6A4A4" }}>#001</span>
            </S.Label>
            <span style={{ fontSize: "15px" }}>Process financial data</span>
          </div>
        </S.Left>
        <div>
          <div><S.Button style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>Code <S.View src={view}></S.View></S.Button></div>
          <div><S.Button onClick={handleShow} style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>Edit <S.View src={view}></S.View></S.Button></div>
        </div>
      </S.Microservice>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form questions={questionsList} step={0} />
        </Modal.Body>
      </Modal>
    </>
  )
}