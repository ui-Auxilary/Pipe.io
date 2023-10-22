import axios from "axios";
import Form from "components/MultiStepForm/Form";
import { useFormData } from "components/MultiStepForm/Form/FormProvider";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"

import S from './styles'
import { useAppData } from "helper/AppProvider";

export default function Edit({ id, show, params, data, closeOverlay, type = "microservice" }) {
    console.log("IN EDIT", show, params, data)
<<<<<<< HEAD
    const { setMicroserviceData, microserviceData } = useFormData();
    const { edit, setPipeIds } = useAppData();


    useEffect(() => {
        console.log('New', edit)

    }, [edit])

        const findAndUpdate = (name: string) => {
=======
    const { setMicroserviceData, microserviceData, microserviceParam, setMicroserviceParam } = useFormData();
    const { edit, setEditData, pipeIds, setPipeIds } = useAppData();


    useEffect(() => {
        console.log('New', edit)

    }, [edit])


    const findAndUpdate = (name: string) => {
        console.log('Looking for', name)
        console.log('Check param', microserviceParam)
>>>>>>> b17baa8954136012a3e5cf141a123c8c84181541
        const foundIndex = (microserviceData.microservices as []).findIndex(x => x.name == name);
        const updatedData = [...microserviceData.microservices as []]
        updatedData[foundIndex] = Object.assign(updatedData[foundIndex], { parameters: edit[id] })
        setMicroserviceData(prev => ({ ...prev, microservices: updatedData }))
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
<<<<<<< HEAD
                findAndUpdate(data["name"])
                axios.put(`http://localhost:8000/microservice/${id}`, {"parameters": edit[id]}).then((res) => {
=======
                findAndUpdate(data?.name)
                axios.put(`http://localhost:8000/microservice/${id}`, data).then((res) => {
>>>>>>> b17baa8954136012a3e5cf141a123c8c84181541
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
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
