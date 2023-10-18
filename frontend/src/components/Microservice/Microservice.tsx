import S from './styles'
import view from 'assets/view.svg'
import Form from 'components/MultiStepForm/Form';
import { useFormData } from 'components/MultiStepForm/Form/FormProvider';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Modal } from 'react-bootstrap';

export default function Microservice({ code, name, docstring, param, parent_file }) {
  const [showEdit, setEdit] = useState(false);
  const [showCode, setCode] = useState(false);
  const [id, setId] = useState();

  const handleEditClose = () => setEdit(false);
  const handleEditShow = () => setEdit(true);
  const handleCodeClose = () => setCode(false);
  const handleCodeShow = () => setCode(true);

  const items = param && Object.keys(param).map((el) => (
    { label: el, "type": "edit_param", id: name }
  ))


  const questionsList = [
    {
      section: 1,
      items: items
    }
  ]

  useEffect(() => {
    axios.post('http://localhost:8000/microservice/add', { "name": name, "parameters": param, "parent_file": parent_file, "code": code, "docstring": docstring }).then(res => setId(JSON.parse(res.data).id))
  }, [])

  const { microserviceParam, microserviceData, setMicroserviceData } = useFormData();
  console.log('MICROSERVIEC DATA', microserviceParam);

  const findAndUpdate = (name: string) => {
    const foundIndex = microserviceData.microservices.findIndex(x => x.name == name);
    const updatedData = [...microserviceData.microservices]
    updatedData[foundIndex] = Object.assign(updatedData[foundIndex], { parameters: microserviceParam[name] })
    setMicroserviceData(prev => ({ ...prev, microservices: updatedData }))
  }

  const handleSave = () => {
    const data = {
      parent_file: parent_file,
      name: name,
      code: code,
      parameters: microserviceParam[name],
      docstring: docstring,
    }

    setMicroserviceData({ ...microserviceData, })

    findAndUpdate(name)
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
          </div>
        </S.Left>
        <div>
          <div><S.Button onClick={handleCodeShow} style={{ display: "flex", width: "150px", gap: "10px", justifyContent: "center", alignItems: "center" }}>Code <S.View src={view}></S.View></S.Button></div>
          {Object.keys(param).length > 0 && (<div><S.Button onClick={handleEditShow} style={{ display: "flex", width: "150px", gap: "10px", justifyContent: "center", alignItems: "center" }}>Input data <S.View src={view}></S.View></S.Button></div>)}
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
          <S.Button onClick={() => handleSave()}>Save</S.Button>
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