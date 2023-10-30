import S from './styles'
import view from 'assets/view.svg'
import Form from 'components/MultiStepForm/Form';
import { useFormData } from 'components/MultiStepForm/Form/FormProvider';
import Select from 'react-select';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Edit from 'components/Edit';
import EditFromPipe from 'components/Edit/EditFromPipe';


export default function Microservice({ code, name, docstring, param, parent_file, from_pipe, parent_pipe_id, output_type }) {
  const [showEdit, setEdit] = useState(false);
  const [showCode, setCode] = useState(false);
  const [id, setId] = useState();
  const [microservices, setMicroservices] = useState([]);
  const [selectedTags, setSelectedTags] = useState("");
  const { setMicroserviceData, microserviceData } = useFormData();

  const handleEditClose = () => { setEdit(false) }
  const handleEditShow = (e: React.SyntheticEvent<EventTarget>) => { e.preventDefault(); setEdit(true) };
  const handleCodeClose = () => { setCode(false) };
  const handleCodeShow = (e: React.SyntheticEvent<EventTarget>) => { e.preventDefault(); setCode(true) };

  param && console.log('ITEMS', param)
  const items = param && Object.keys(param).map((el) => (
    { label: el, type: "edit_param", name: id, value: param[el] ? param[el]["default"] : '', elType: param[el] ? param[el]["type"] : '' }
  ))

  const tagOptions = [
    { value: 'value', label: 'Value' },
    // { value: 'ml', label: 'ML' },
    // { value: 'data_frame', label: 'Dataframe' },
    { value: 'graph', label: 'Stock Graph'},
    // { value: 'csv', label: 'CSV'},
    { value: 'plot', label: 'Plot File'}
  ];




  

  const microserviceList = [
    {
      section: 1,
      items: items
    }
  ]

  useEffect(() => {
    /** instead of using the microservice collection id as the id, we use the name of the microservice. */
    setId(name)
    if (output_type != undefined) {
      setSelectedTags(tagOptions.find((el) => el.value == output_type));
    }
  }, [])

  const handleTagChange = (e: any) => {
    setSelectedTags(e);
    data["output_type"] = e;
    axios.put(`http://localhost:8000/pipes/${parent_pipe_id}/${name}?output_type=${e.value}`).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    });
    console.log("TESTING", microserviceData);
    const newData = {...microserviceData};
    newData["microservices"][name]["output_type"] = e.value;
    setMicroserviceData(newData);
  }

  
  
  const data = {
    parent_file: parent_file,
    name: name,
    code: code,
    docstring: docstring,
    parameters: param,
    output_type: selectedTags ? selectedTags.value : ""
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
            <S.Tag>
              <Select
                options={tagOptions}
                value={selectedTags}
                onChange={handleTagChange}
                placeholder="Select Output Type"
                style = {{minWidth: "200px", maxWidth: "200px"}}
              />
            </S.Tag>
          </div>
        </S.Left>
        <div>
          <div><S.Button onClick={handleCodeShow} style={{ display: "flex", width: "150px", gap: "10px", justifyContent: "center", alignItems: "center" }}>Code <S.View src={view}></S.View></S.Button></div>
          {Object.keys(param).length > 0 && (<div><S.Button onClick={handleEditShow} style={{ display: "flex", width: "150px", gap: "10px", justifyContent: "center", alignItems: "center" }}>Input data <S.View src={view}></S.View></S.Button></div>)}
        </div>
      </S.Microservice>
      
      {!from_pipe&&<Edit id={id} show={showEdit} params={microserviceList} data={data} closeOverlay={handleEditClose} />}
      {from_pipe&&<EditFromPipe id={id} show={showEdit} params={microserviceList} data={data} closeOverlay={handleEditClose} parent_pipe_id={parent_pipe_id}/>}
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
