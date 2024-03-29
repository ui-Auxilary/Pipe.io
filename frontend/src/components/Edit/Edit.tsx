import axios from "axios";
import Form from "components/MultiStepForm/Form";
import { useFormData } from "components/MultiStepForm/Form/FormProvider";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { EditProps } from "types/EditTypes";

import { useAppData } from "helper/AppProvider";

export default function Edit({ id, show, params, data, closeOverlay, type = "microservice" }: EditProps) {
  const { setMicroserviceData, microserviceData } = useFormData();
  const [, setMicroservices] = useState<object[]>([]);
  const { edit, setEdit, setPipeIds } = useAppData();


  useEffect(() => {
    setMicroservices((microserviceData.microservices as []));
  }, [microserviceData]);

  const findAndUpdate = (parameters) => {
    const updatedData: { [key: string] } = [...microserviceData.microservices as []];

    // Loop through edit to see what indexes need to be updated
    Object.keys(edit).map(idx => {
      const editIdx = parseInt(idx);
      const updatedIdx = editIdx - 1;
      if (updatedIdx >= 0 && updatedData[updatedIdx]) {

        // If data has been modified, update each parameter
        Object.keys(parameters).forEach(key => {
          const newParams = edit[editIdx] && parameters[key] ? Object.assign(parameters[key], { value: edit[editIdx][key] }) : parameters[key] || edit[editIdx];
          updatedData[updatedIdx]["parameters"][key] = newParams;
        });

        updatedData[updatedIdx] = Object.assign(updatedData[updatedIdx], { output_type: data.output_type });

      }
    })

    setEdit({});
    setMicroserviceData((prev) => ({ ...prev, microservices: updatedData }));

  }


  const handleSave = () => {
    switch (type) {
      case "pipe":
        axios.put(`http://localhost:8000/pipes/${id}`, edit[id]).then(() => {
          setPipeIds((prev) => [...prev]);
        }).catch();
        break;
      default:
        findAndUpdate(data["parameters"]);
    }
    closeOverlay();
  }

  return (
    <Modal show={show} onHide={() => { setEdit({}); closeOverlay() }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form itemList={params} step={0} edit={true} onHandleClose={handleSave} />
      </Modal.Body>
    </Modal>
  )
}
