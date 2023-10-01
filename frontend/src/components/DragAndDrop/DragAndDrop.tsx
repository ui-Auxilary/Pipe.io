import Dropzone from "./Dropzone";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import S from './style';
export interface Props {
  show: boolean
  handleClose: () => void
}

export default function DragAndDrop({ show, handleClose }: Props) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Pipeline</Modal.Title>
      </Modal.Header>
      <S.Wrapper>
        <Modal.Body>
          <S.Form>
            <S.Label>Name</S.Label>
            <S.Input type="text" name="name" />
            <S.Label>Description</S.Label>
            <S.Textarea />
          </S.Form>
          <S.Label>Data source</S.Label>
          <Dropzone />
        </Modal.Body>
      </S.Wrapper>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
