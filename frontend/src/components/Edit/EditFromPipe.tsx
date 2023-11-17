import axios from "axios";
import Form from "components/MultiStepForm/Form";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"

import { useAppData } from "helper/AppProvider";
import { EditFromPipeProps } from "types/EditTypes";

export default function EditFromPipe({ id, show, params, data, closeOverlay, type = "microservice", parent_pipe_id, idx }: EditFromPipeProps) {
  const [microservice, setMicroservice] = useState([]);
  const { edit, setEdit, setPipeIds } = useAppData();

  useEffect(() => {
    setMicroservice(data)
  }, [edit])

  const findAndUpdate = (parameters: { [x: string] }) => {
    const updatedData = { ...microservice };

    // If parameter has been modified, edit microserviceData
    Object.keys(parameters).forEach(key => {
      if (edit?.[idx]?.[key] !== undefined) {
        const newParams = edit[idx] && parameters[key] ? Object.assign(parameters[key], { value: edit[idx][key] }) : parameters[key] || edit[idx];
        updatedData["parameters"][key] = newParams;
      }
    })
    setEdit({});

    setMicroservice((prev) => ({ ...prev, microservices: updatedData }));

  }

  const handleSave = () => {
    switch (type) {
      case "pipe":
        axios.put(`http://localhost:8000/pipes/${id}`, edit[id]).then(() => {
          setPipeIds((prev) => [...prev])
        });
        break;
      default:
        findAndUpdate(data["parameters"])
        axios.put(`http://localhost:8000/pipes/${parent_pipe_id}/microservices`, { "name": microservice.name, "parameters": microservice["parameters"] });
    }
    closeOverlay();
  }

  return (
    <Modal show={show} onHide={closeOverlay}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form itemList={params} step={0} edit={true} onHandleClose={handleSave} />
      </Modal.Body>
    </Modal>
  )
}
