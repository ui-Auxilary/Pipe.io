import axios from "axios";
import Form from "components/MultiStepForm/Form";
import { useFormData } from "components/MultiStepForm/Form/FormProvider";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"

import S from './styles'
import { useAppData } from "helper/AppProvider";

export default function Edit({ id, show, params, data, closeOverlay, type = "microservice" }) {
    console.log("IN EDIT", show, params, data)
    const { setMicroserviceData, microserviceData } = useFormData();
    const [ microservices, setMicroservices ] = useState([]);
    const { edit, setPipeIds } = useAppData();



    useEffect(() => {
        console.log('New', edit)
        setMicroservices(data)
    }, [edit])

    const findAndUpdate = (name: string) => {
        const foundIndex = (microserviceData.microservices as []).findIndex(x => x.name == name);
        const updatedData = [...microserviceData.microservices as []]

        let newParams = {...data.parameters}

        // for loop  to find matching keys  between edit[id] and params
        for (const [key, value] of Object.entries(edit[name])) {
            newParams[key].default = value;
        }

        // updatedData[foundIndex] = Object.assign(updatedData[foundIndex], { parameters: newParams })
        console.log("EDITID: ", newParams);
        console.log(microserviceData.microservices)
        updatedData[foundIndex] = Object.assign(updatedData[foundIndex], { parameters: newParams })
        setMicroserviceData(prev => ({ ...prev, microservices: updatedData }))
        return newParams
    }

    const handleSave = () => {
        switch (type) {
            case "pipe":
                axios.put(`http://localhost:8000/pipes/${id}`, edit[id]).then((res) => {
                    console.log(res)
                    setPipeIds(prev => [...prev])
                }).catch((err) => {
                    console.log(err)
                })
                break;
            default:
                /** update microserviceData with updated microservices w new params */
                findAndUpdate(data["name"])
        }
        closeOverlay();
    }

    return (
        <Modal show={show} onHide={closeOverlay}>
            <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form questions={params} step={0} />
            </Modal.Body>
            <Modal.Footer>
                <S.Button onClick={() => handleSave()}>Save</S.Button>
            </Modal.Footer>
        </Modal>
    )
}
