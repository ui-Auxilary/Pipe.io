import axios from "axios";
import Form from "components/MultiStepForm/Form";
import { useFormData } from "components/MultiStepForm/Form/FormProvider";
import { useState } from "react";
import { Modal } from "react-bootstrap"

import S from './styles'

export default function Edit({ id, show, params, data, closeOverlay }) {
    console.log("IN EDIT", show, params, data)
    const { setMicroserviceData, microserviceData, microserviceParam, setMicroserviceParam } = useFormData();


    const findAndUpdate = (name: string) => {
        const foundIndex = (microserviceData.microservices as []).findIndex(x => x.name == name);
        const updatedData = [...microserviceData.microservices as []]
        updatedData[foundIndex] = Object.assign(updatedData[foundIndex], { parameters: microserviceParam[name] })
        setMicroserviceData(prev => ({ ...prev, microservices: updatedData }))
    }

    const handleSave = () => {
        findAndUpdate(data?.name)
        axios.put(`http://localhost:8000/microservice/${id}`, data).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
        console.log('PARAM DATA', microserviceParam)
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
