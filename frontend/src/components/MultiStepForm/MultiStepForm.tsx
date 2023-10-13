import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "components/MultiStepForm/Form";

import S from "./style";
import { useState } from "react";

import "./MultiStepForm.css"

import { useFormData } from "components/MultiStepForm/Form/FormProvider";
import { ModalFooter } from "react-bootstrap";

export interface Props {
  show: boolean;
  handleClose: () => void;
}

export default function MultiStepForm({ show, handleClose }: Props) {
  const questionsList = [
    {
      section: 1,
      items: [
        {
          label: 'Name',
          type: 'text',
          value: 'name'
        },
        {
          label: 'Description',
          type: 'text',
          value: 'description'
        },
        {
          label: 'Data source',
          type: 'dropzone',
          value: 'csv'
        }
      ]
    },
    {
      section: 2,
      items: [
        {
          type: 'list_microservices',
        },
      ]
    },
    {
      section: 3,
      items: [
        {
          label: 'Upload microservice file(s)',
          type: 'dropzone',
          value: 'python'
        }
      ]
    },
    {
      section: 4,
      items: [
        {
          type: 'view_microservices',
        },
      ]
    },
  ]
  const totalPagesCount = questionsList.length
  const [formAnswers, setFormAnswers] = useState({})

  const onFormUpdate = (step, answerObj) => {
    console.log('Form update', step, answerObj)
    setFormAnswers({ ...formAnswers, [step]: answerObj })
  }

  const { currentStep, submitData, setStep } = useFormData();

  const onNext = () => {
    if (currentStep < totalPagesCount) {
      setStep(prevIndex => prevIndex + 1)
    }
  }

  const onHandleClose = () => {
    handleClose()
    setTimeout(() => setStep(1), 500)
  }

  return (
    <Modal dialogClassName="form-modal" contentClassName="modal-height" show={show} onHide={onHandleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Pipeline</Modal.Title>
      </Modal.Header>
      <S.Wrapper>
        <Modal.Body>
          <Form questions={questionsList} step={currentStep - 1} onFormUpdate={onFormUpdate} pageAnswers={formAnswers} />
        </Modal.Body>
      </S.Wrapper>
      <ModalFooter>
        {currentStep == totalPagesCount ? (<Button onClick={() => submitData(onHandleClose)} variant="secondary">Submit</Button>) : (<Button onClick={onNext}>Next</Button>)}

      </ModalFooter>
    </Modal>
  );
}
