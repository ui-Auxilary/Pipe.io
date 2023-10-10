import S from './styles'
import view from 'assets/view.svg'
import Form from 'components/Form';
import { useFormData } from 'components/Form/FormProvider';
import { useState } from 'react';
import axios, { Axios } from 'axios';

import { Modal } from 'react-bootstrap';

<<<<<<< HEAD
export default function Microservice({ id, code, name, docstring, param, parent_file }) {
  console.log('INSIDE', id)
=======
export default function Microservice({ code, name, docstring, param, parent_file }) {
>>>>>>> 6d8847578a3ca270413fe9d6028d09570d05344c
  const [showEdit, setEdit] = useState(false);
  const [showCode, setCode] = useState(false);

  const handleEditClose = () => setEdit(false);
  const handleEditShow = () => setEdit(true);
  const handleCodeClose = () => setCode(false);
  const handleCodeShow = () => setCode(true);


  // const paramArray = Object.keys(param).map((el) => (
  //   { label: el, "type": "edit_param" , id: name}
  // ))
  const items = param && Object.keys(param).map((el) => (
    { label: el, "type": "edit_param" , id: name}
  ))



  // console.log('ITEMS', param, name)

  const questionsList = [
    {
      section: 1,
      items: items
    }
  ]

  const { userData, microserviceParam } = useFormData();
  console.log('MICROSERVIEC DATA', microserviceParam);





  const handleSave = () => {
    const data = {
      parent_file: parent_file,
      name: name,
      code : code,
      parameters: microserviceParam[name],
      docstring: docstring,
    }
    console.log('DATA', data)
    console.log('id', id)
    axios.put(`http://localhost:8000/microservice/${id}`, data).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    handleEditClose()
  }

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
          <div><S.Button onClick={handleCodeShow} style={{ display: "flex", width: "150px", gap: "10px", justifyContent: "center", alignItems: "center" }}>Code <S.View src={view}></S.View></S.Button></div>
          <div><S.Button onClick={handleEditShow} style={{ display: "flex", width: "150px", gap: "10px", justifyContent: "center", alignItems: "center" }}>Input data <S.View src={view}></S.View></S.Button></div>
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
          <S.Button onClick={()=> handleSave()}>Save</S.Button>
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