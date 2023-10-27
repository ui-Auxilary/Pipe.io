import { FormEvent, useRef } from "react"
import FormItem from "../FormItem"
import { useFormData } from "./FormProvider"
import S from './style'
import { Button } from "react-bootstrap"

export interface Item {
    label: string
    type: string
    value: string
    id: string
    validation?: string
    errorMessage?: string
}

export default function Form({ questions, step, edit = false, onHandleClose = () => { } }) {
    console.log('Q', questions)
    const formRef = useRef(null);

    // Validation logic
    const { currentStep, submitData, setStep } = useFormData();

    const onNext = () => {
        if (formRef.current.reportValidity() && currentStep < questions.length) {
            setStep(prevIndex => prevIndex + 1)
            console.log('here')
        }
    }
    console.log(edit, "EDIT")

    return (
        <form ref={formRef}>
            {
                questions && questions[step].items.map((item: Item) => (
                    <FormItem key={item.label} item={item} />
                ))
            }
            {!edit && (currentStep == questions.length ? (
                <Button style={{ marginTop: '50px', position: 'relative', right: '-90%' }} onClick={() => submitData(onHandleClose)} variant="secondary">Submit</Button>
            ) : (
                <Button style={{ marginTop: '50px', position: 'relative', right: '-90%' }} onClick={onNext}>Next</Button>
            ))}
        </form>
    )
}
