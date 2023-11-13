import { useRef } from "react"
import FormItem from "../FormItem"
import { useFormData } from "./FormProvider"
import S from './style'
import { Button } from "react-bootstrap"
import { FormPageProps, Item } from "types/multiForm"

export default function Form({ itemList, step, edit = false, onHandleClose = () => { } }: FormPageProps) {
    const { currentStep, submitData, setStep } = useFormData();
    const formRef = useRef(null);

    // Check validity of form
    const onNext = () => {
        if (formRef.current && (formRef.current as HTMLFormElement).reportValidity() && currentStep < itemList.length) {
            setStep(prevIndex => prevIndex + 1)
        }
    }

    const onEdit = () => {
        if (formRef.current && (formRef.current as HTMLFormElement).reportValidity()) {
            onHandleClose();
        }
    }

    return (
        <form ref={formRef}>
            {
                itemList && itemList[step].items.map((item: Item) => (
                    <FormItem key={item.label} item={item} />
                ))
            }
            {!edit && (currentStep == itemList.length ? (
                <Button style={{ marginTop: '50px', position: 'relative', right: '-90%' }} onClick={() => submitData(onHandleClose)} variant="secondary">Submit</Button>
            ) : (
                <Button style={{ marginTop: '50px', position: 'relative', right: '-90%' }} onClick={onNext}>Next</Button>
            ))}
            {edit && <S.ButtonContainer><Button onClick={onEdit}>Update</Button></S.ButtonContainer>}
        </form>
    )
}
