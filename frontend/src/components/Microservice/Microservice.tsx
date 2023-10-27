import S from './styles'
import view from 'assets/view.svg'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Modal } from 'react-bootstrap';
import Edit from 'components/Edit';
import EditFromPipe from 'components/Edit/EditFromPipe';

export default function Microservice({ code, name, docstring, param, parent_file, from_pipe, parent_pipe_id }) {
  const [showEdit, setEdit] = useState(false);
  const [showCode, setCode] = useState(false);
  const [id, setId] = useState();
  const [microservices, setMicroservices] = useState([]);

  const handleEditClose = (e: React.SyntheticEvent<EventTarget>) => { setEdit(false) }
  const handleEditShow = (e: React.SyntheticEvent<EventTarget>) => { e.preventDefault(); setEdit(true) };
  const handleCodeClose = (e: React.SyntheticEvent<EventTarget>) => { setCode(false) };
  const handleCodeShow = (e: React.SyntheticEvent<EventTarget>) => { e.preventDefault(); setCode(true) };

  const items = param && Object.keys(param).map((el) => (
    { label: el, "type": "edit_param", id: id }
  ))


  const microserviceList = [
    {
      section: 1,
      items: items
    }
  ]

  useEffect(() => {
    /** instead of using the microservice collection id as the id, we use the name of the microservice. */
    setId(name)
  }, [])

  const data = {
    parent_file: parent_file,
    name: name,
    code: code,
    docstring: docstring,
    parameters: param
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
      {!from_pipe && <Edit id={id} show={showEdit} params={microserviceList} data={data} closeOverlay={handleEditClose} />}
      {from_pipe && <EditFromPipe id={id} show={showEdit} params={microserviceList} data={data} closeOverlay={handleEditClose} parent_pipe_id={parent_pipe_id} />}
      <Modal show={showCode} onHide={handleCodeClose}>
        <Modal.Header closeButton>
          <Modal.Title>Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <code>{code.split('\n').map((line: string) => <p>{line}</p>)}</code>
        </Modal.Body>
      </Modal>
    </>
  )
}