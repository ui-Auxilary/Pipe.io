import axios from "axios";
import Form from "components/MultiStepForm/Form";
import { useFormData } from "components/MultiStepForm/Form/FormProvider";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"

import S from './styles'
import { useAppData } from "helper/AppProvider";

export default function Edit({ id, show, params, data, closeOverlay, type = "microservice" }) {
    console.log("IN EDIT", show, params, data)
    const { setMicroserviceData, microserviceData } = useFormData();
    const [microservices, setMicroservices] = useState([]);
    const { edit, setPipeIds } = useAppData();


    useEffect(() => {
        console.log('PICKA');
    }, [])

    useEffect(() => {
        console.log('New', edit)
        setMicroservices(data)
    }, [edit])

    const findAndUpdate = (name: string, parameters) => {

        const foundIndex = (microserviceData.microservices as []).findIndex(x => x.name == name);
        // console.log('updating', foundIndex, edit, edit[name], name)
        // console.log('Microdata', microserviceData)
        const updatedData = [...microserviceData.microservices as []]
        if (foundIndex >= 0) {

            console.log('Updated', updatedData[foundIndex]["parameters"], name, parameters, edit[name])
            console.log('OLD', parameters)
            Object.keys(parameters).forEach(key => {
                console.log('Edit', edit[name][key], 'params', parameters[key])
                let newParams = Object.assign(parameters[key], { value: edit[name][key] })
                console.log('NEW para', newParams)
                updatedData[foundIndex]["parameters"][key] = newParams
            })

        }
        console.log('Updated Data', updatedData,)
        // updatedData[foundIndex] = Object.assign(updatedData[foundIndex], { parameters: edit[name] })
        setMicroserviceData(prev => ({ ...prev, microservices: updatedData }))

        console.log('NEW', microserviceData)
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
                findAndUpdate(data["name"], data["parameters"])
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
