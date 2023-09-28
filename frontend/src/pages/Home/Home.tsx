import PageTemplate from "../../components/PageTemplate/PageTemplate"
import DragAndDrop from "../../components/DragAndDrop"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Sidebar from "../../components/DragAndDrop/Sidebar"
import S from './style'
import { useState } from "react";

export default function Home() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <PageTemplate>
        <S.Wrapper>
            <Sidebar />
            <S.Container>
            <S.Header>
                <Button onClick={handleShow}>+ Create pipeline</Button>
            </S.Header>
            0 pipeline(s) selected
            </S.Container>
        </S.Wrapper>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Pipeline</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <DragAndDrop />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </PageTemplate>
  )
}
