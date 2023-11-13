import axios from "axios";
import Form from "components/MultiStepForm/Form";
import { useFormData } from "components/MultiStepForm/Form/FormProvider";
import { useEffect, useState } from "react";
import { Button, Modal, CloseButton } from "react-bootstrap"

import S from './styles'
import { useAppData } from "helper/AppProvider";

export default function Edit({ id, show, params, data, closeOverlay, type = "microservice" }) {
    const { setMicroserviceData, microserviceData } = useFormData();
    const [microservices, setMicroservices] = useState<object[]>([]);
    const { edit, setEdit, setPipeIds } = useAppData();


    useEffect(() => {
        console.log('New POO', microserviceData, edit)
        setMicroservices((microserviceData.microservices as []))
    }, [microserviceData])

    const findAndUpdate = (name: string, parameters: any) => {
        console.log('Updating findAndUpdate', microservices, edit)

        const updatedData: { [key: string]: any } = [...microserviceData.microservices as []]

        // Loop through edit to see what indexes need to be updated
        Object.keys(edit).map(idx => {
            let editIdx = parseInt(idx);
            let updatedIdx = editIdx - 1;
            if (updatedIdx >= 0 && updatedData[updatedIdx]) {

                console.log('Updated', updatedData[updatedIdx]["parameters"], name, parameters, edit, editIdx)
                console.log('OLD', parameters)
                Object.keys(parameters).forEach(key => {

                    const newParams = edit[editIdx] && parameters[key] ? Object.assign(parameters[key], { value: edit[editIdx][key] }) : parameters[key] || edit[editIdx]
                    console.log('NEW para', newParams, updatedData, name, key)
                    updatedData[updatedIdx]["parameters"][key] = newParams
                })

                console.log('OUTPUT_TYPE', data);
                console.log(updatedData, updatedIdx)
                updatedData[updatedIdx] = Object.assign(updatedData[updatedIdx], { output_type: data.output_type })

            }
        })
        // const foundIndex = (microservices).findIndex(x => x.name == name);
        // console.log('updating', foundIndex, edit, edit[name], name)
        // console.log('Microdata', microserviceData)


        console.log('Updated Data', updatedData)
        // updatedData[foundIndex] = Object.assign(updatedData[foundIndex], { parameters: edit[name] })
        setEdit({})
        setMicroserviceData(prev => ({ ...prev, microservices: updatedData }))

        console.log('NEW', microserviceData)
    }

    useEffect(() => {
        console.log('CHECK EDIt', edit)
    }, [edit])
    const handleSave = () => {
        switch (type) {
            case "pipe":
                console.log('EDITING', edit, edit[id], id)
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

    const checkSaved = () => {

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
