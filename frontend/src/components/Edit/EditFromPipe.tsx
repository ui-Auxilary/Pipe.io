import axios from "axios";
import Form from "components/MultiStepForm/Form";
import { useFormData } from "components/MultiStepForm/Form/FormProvider";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"

import S from './styles'
import { useAppData } from "helper/AppProvider";

export default function EditFromPipe({ id, show, params, data, closeOverlay, type = "microservice", parent_pipe_id }) {
    console.log("IN COOl EDIT", show, params, data)
    const [microservice, setMicroservice] = useState([]);
    const { edit, setPipeIds } = useAppData();
    console.log('PIPE', params)

    useEffect(() => {
        console.log('New', edit)
        setMicroservice(data)
    }, [edit])

    useEffect(() => {
        console.log('HERE FROM PIPE')
    }, [])


    const findAndUpdate = (name: string) => {

        console.log(microservice)
        console.log('hig')

    }

    const handleSave = () => {
        switch (type) {
            case "pipe":
                console.log('SAVUBNG HERE')
                axios.put(`http://localhost:8000/pipes/${id}`, edit[id]).then((res) => {
                    console.log(res)
                    setPipeIds(prev => [...prev])
                }).catch((err) => {
                    console.log(err)
                })
                break;
            default:
                findAndUpdate(data["name"])
                axios.put(`http://localhost:8000/pipes/${parent_pipe_id}/microservices`, { "name": microservice.name, "parameters": edit[id] }).then((res) => {
                    console.log("success", res)
                }).catch((err) => {
                    console.log(err)
                });
        }
        closeOverlay();
    }

    return (
        <Modal show={show} onHide={closeOverlay}>
            <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form questions={params} step={0} edit={true} onHandleClose={handleSave} />
            </Modal.Body>
        </Modal>
    )
}
