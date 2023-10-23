import axios from "axios";
import Form from "components/MultiStepForm/Form";
import { useFormData } from "components/MultiStepForm/Form/FormProvider";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"

import S from './styles'
import { useAppData } from "helper/AppProvider";

export default function EditFromPipe({ id, show, params, data, closeOverlay, type = "microservice" }) {
    console.log("IN EDIT", show, params, data)
    const [ microservices, setMicroservices ] = useState([]);
    const { edit, setPipeIds } = useAppData();


    useEffect(() => {
        console.log('New', edit)
        setMicroservices(data)
    }, [edit])

    const findAndUpdate = (name: string) => {

        console.log(microservices)
        console.log('hig')
        
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
                findAndUpdate(data["name"])
                axios.put(`http://localhost:8000/microservice/${id}`, {"parameters": edit[id]}).then((res) => {
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
