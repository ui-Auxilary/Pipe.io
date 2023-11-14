import Modal from "react-bootstrap/Modal";
import Form from "components/MultiStepForm/Form";

import S from "./style";

import "./MultiStepForm.css"

import { useFormData } from "components/MultiStepForm/Form/FormProvider";
import { ModalFooter } from "react-bootstrap";
import { MultiFormProps } from "types/MultistepFormTypes";

export default function MultiStepForm({ show, handleClose }: MultiFormProps) {
  const itemList = [
    {
      section: 1,
      items: [
        {
          label: 'Name',
          type: 'text',
          value: 'name',
          validation: /^.{1,25}$/,
          errorMessage: 'Name must not exceed 25 characters'
        },
        {
          label: 'Description',
          type: 'text',
          value: 'description',
          validation: /^.{1,250}$/,
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
          type: 'upload_microservices',
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

  const { currentStep, setStep } = useFormData();

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
          <Form itemList={itemList} step={currentStep - 1} onHandleClose={onHandleClose} />
        </Modal.Body>
      </S.Wrapper>
      <ModalFooter />
    </Modal>
  );
}
