import Dropzone from "./Dropzone";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Form from "components/Form";

import S from "./style";
import { useContext, useEffect, useState } from "react";

import "./DragAndDrop.css"

import FormProvider, { multiFormContext, useFormData } from "components/Form/FormProvider";
import { ModalFooter } from "react-bootstrap";
import Microservice from "components/Microservice";

export interface Props {
  show: boolean;
  handleClose: () => void;
}

export default function DragAndDrop({ show, handleClose }: Props) {
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
  const [submitted, setSubmitted] = useState(false);

  const onFormUpdate = (step, answerObj) => {
    console.log('Form update', step, answerObj)
    setFormAnswers({ ...formAnswers, [step]: answerObj })
  }

  const { userData, currentStep, submitData, setStep, microserviceData} = useFormData();
  const { microservices, parent_file } = microserviceData

  useEffect(() => {
    console.log('Updated!', userData)
  }, [userData])

  useEffect(() => {
    console.log('Updated step!', currentStep)
  }, [currentStep])


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
        {currentStep == totalPagesCount ? (<Button onClick={submitData} variant="secondary">Submit</Button>) : (<Button onClick={onNext}>Next</Button>)}

      </ModalFooter>
    </Modal>
  );
}
