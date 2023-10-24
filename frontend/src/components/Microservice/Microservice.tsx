import S from './styles'
import view from 'assets/view.svg'
import Form from 'components/MultiStepForm/Form';
import { useFormData } from 'components/MultiStepForm/Form/FormProvider';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

import { Modal } from 'react-bootstrap';
import Edit from 'components/Edit';

export default function Microservice({ code, name, docstring, param, parent_file}) {
  const [showEdit, setEdit] = useState(false);
  const [showCode, setCode] = useState(false);
  const [id, setId] = useState();
  const [selectedTags, setSelectedTags] = useState("value");

  const { setMicroserviceData, microserviceData } = useFormData();


  const handleEditClose = () => setEdit(false);
  const handleEditShow = () => setEdit(true);
  const handleCodeClose = () => setCode(false);
  const handleCodeShow = () => setCode(true);

  const items = param && Object.keys(param).map((el) => (
    { label: el, "type": "edit_param", id: id }
  ))

  const tagOptions = [
    { value: 'value', label: 'Value' },
    { value: 'ml', label: 'ML' },
    { value: 'data_frame', label: 'Dataframe' },
    { value: 'graph', label: 'Graph'},
    { value: 'csv', label: 'CSV'}
  ];
  

  const microserviceList = [
    {
      section: 1,
      items: items
    }
  ]

  useEffect(() => {
    axios.post('http://localhost:8000/microservice/add', { "name": name, "parameters": param, "parent_file": parent_file, "code": code, "docstring": docstring, "output_type": selectedTags }).then(res => setId(JSON.parse(res.data).id))
  }, [])

  const handleTagChange = (e: any) => {
    setSelectedTags(e);
    const foundIndex = (microserviceData.microservices as []).findIndex(x => x.name == data["name"]);
    const updatedData = [...microserviceData.microservices as []]
    updatedData[foundIndex] = Object.assign(updatedData[foundIndex], { output_type: e })
    setMicroserviceData(prev => ({ ...prev, microservices: updatedData }))
    data["output_type"] = e
    axios.put(`http://localhost:8000/microservice/${id}`, {"output_type": selectedTags.value}).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    });
    console.log("TESTING", microserviceData);
  }

  
  
  const data = {
    parent_file: parent_file,
    name: name,
    code: code,
    docstring: docstring,
    parameters: param,
    output_type: selectedTags.value
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


      <Edit id={id} show={showEdit} params={microserviceList} data={data} closeOverlay={handleEditClose} />
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