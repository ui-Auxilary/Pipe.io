import S from './styles'
import view from 'assets/view.svg'
import Form from 'components/Form';
import { useFormData } from 'components/Form/FormProvider';
import { useState } from 'react';

import { Modal } from 'react-bootstrap';

export default function Microservice({ code, name, doc, param }) {
  const [showEdit, setEdit] = useState(false);
  const [showCode, setCode] = useState(false);

  const handleEditClose = () => setEdit(false);
  const handleEditShow = () => setEdit(true);
  const handleCodeClose = () => setCode(false);
  const handleCodeShow = () => setCode(true);

  const items = param && param.map((el) => (
    { label: el, "type": "edit_param" , id: "penis"}
  ))

  console.log('ITEMS', items)

  const questionsList = [
    {
      section: 1,
      items: items
    }
  ]

  const { microserviceParam, microserviceData } = useFormData();
  // console.log(microserviceData);


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
          <div><S.Button onClick={handleCodeShow} style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>Code <S.View src={view}></S.View></S.Button></div>
          <div><S.Button onClick={handleEditShow} style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>Edit <S.View src={view}></S.View></S.Button></div>
        </div>
      </S.Microservice>
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form questions={questionsList} step={0} />
        </Modal.Body>
        <Modal.Footer>
          <S.Button>Save</S.Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showCode} onHide={handleCodeClose}>
        <Modal.Header closeButton>
          <Modal.Title>Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <code>{code.split('\n').map((line) => <p>{line}</p>)}</code>
        </Modal.Body>
      </Modal>
    </>
  )
}