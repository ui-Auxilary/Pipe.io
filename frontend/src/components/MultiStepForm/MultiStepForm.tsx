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
          value: 'name',
          validation: /^[a-zA-Z]{1,25}$/,
          errorMessage: 'Name must not exceed 25 characters'
        },
        {
          label: 'Description',
          type: 'text',
          value: 'description',
          validation: /^[a-zA-Z]{1,250}$/,
          errorMessage: 'Description must not exceed 250 characters'
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
          label: 'Upload microservice file(s)',
          type: 'dropzone',
          value: 'python'
        }
      ]
    },
    {
      section: 3,
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
          <Form questions={questionsList} step={currentStep - 1} onFormUpdate={onFormUpdate} pageAnswers={formAnswers} onHandleClose={onHandleClose} />
        </Modal.Body>
      </S.Wrapper>
      <ModalFooter />
    </Modal>
  );
}
