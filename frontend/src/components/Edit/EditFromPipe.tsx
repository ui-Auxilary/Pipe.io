import axios from "axios";
import Form from "components/MultiStepForm/Form";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"

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


    const findAndUpdate = (name: string, parameters) => {
        // console.log('updating', foundIndex, edit, edit[name], name)
        console.log('Microdata', microservice)
        const updatedData = { ...microservice }

        // console.log('Updated', updatedData["parameters"], name, parameters, edit[name])
        console.log('OLD', parameters)
        Object.keys(parameters).forEach(key => {
            if (edit[name][key] != undefined) {
                const newParams = edit[name] && parameters[key] ? Object.assign(parameters[key], { value: edit[name][key] }) : parameters[key] || edit[name]
                console.log('NEW para', newParams)
                updatedData["parameters"][key] = newParams
            }
        })
        console.log('Updated Data', updatedData)
        // updatedData[foundIndex] = Object.assign(updatedData[foundIndex], { parameters: edit[name] })
        setMicroservice(prev => ({ ...prev, microservices: updatedData }))

        console.log('NEW', microservice)

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
                findAndUpdate(data["name"], data["parameters"])
                axios.put(`http://localhost:8000/pipes/${parent_pipe_id}/microservices`, { "name": microservice.name, "parameters": microservice["parameters"] }).then((res) => {
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
