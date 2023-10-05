import Dropzone from "./Dropzone";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "components/Form";

import S from "./style";
import { useState } from "react";
export interface Props {
  show: boolean;
  handleClose: () => void;
}

export default function DragAndDrop({ show, handleClose }: Props) {
  const [index, setIndex] = useState(0)
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
          value: 'name'
        }
      ]
    },
    {
      section: 2,
      items: [
        {
          label: 'asdsad',
          type: 'text',
          value: 'name'
        },
        {
          label: 'assadsad',
          type: 'text',
          value: 'description'
        },
      ]
    }
  ]
  const totalPagesCount = questionsList.length
  const [formAnswers, setFormAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false);
  const onFormUpdate = (step, answerObj) => {
    console.log('Form update', step, answerObj)
    setFormAnswers({ ...formAnswers, [step]: answerObj })
  }



  const onSubmit = () => {
    setSubmitted(true)
    console.log('FORM', formAnswers)
    setFormAnswers({})
    console.log('FORM2', formAnswers)
  }

  const onNext = () => {
    if (index < 1) {
      setIndex(prevIndex => prevIndex + 1)
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Pipeline</Modal.Title>
      </Modal.Header>
      <S.Wrapper>
        <Modal.Body>
          <Form questions={questionsList} step={index} onSubmit={submitted} onFormUpdate={onFormUpdate} pageAnswers={formAnswers} />
          {/* <S.Form>
            <S.Label>Name</S.Label>
            <S.Input type="text" name="name" />
            <S.Label>Description</S.Label>
            <S.Textarea />
          </S.Form>
          <S.Label>Data source</S.Label>
          <Dropzone /> */}
        </Modal.Body>
      </S.Wrapper>
      <Modal.Footer>
        {index == 0 ? (<Button variant="secondary" onClick={onSubmit}>
          Submit
        </Button>) : <Button variant="secondary" onClick={onNext}>
          Next
        </Button>}
      </Modal.Footer>
    </Modal>
  );
}
