import { useRef } from "react"
import FormItem from "../FormItem"
import { useFormData } from "./FormProvider"
import S from './style'
import { Button } from "react-bootstrap"
import { Item, FormProps } from "types/MultistepFormTypes"

export default function Form({ questions, step, edit = false, onHandleClose = () => { } }: FormProps) {
  const formRef = useRef(null);

  // Validation logic
  const { currentStep, submitData, setStep } = useFormData();

  const onNext = () => {
    if (formRef.current.reportValidity() && currentStep < questions.length) {
      setStep((prevIndex: any) => prevIndex + 1);
    }
  }

  const onEdit = () => {
    if (formRef.current.reportValidity()) {
      onHandleClose();
    }
  }

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
      {edit && <S.ButtonContainer><Button onClick={onEdit}>Update</Button></S.ButtonContainer>}
    </form>
  )
}
