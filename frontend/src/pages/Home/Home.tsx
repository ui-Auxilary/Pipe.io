import PageTemplate from "components/PageTemplate/PageTemplate";
import DragAndDrop from "components/DragAndDrop";

import Button from "react-bootstrap/Button";

import Sidebar from "../../components/Sidebar";
import S from "./style";

import { useState } from "react";
import PipeList from "components/PipeList/PipeList";

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
            <div style={{ display: "flex", gap: "25px" }}>
              <h3>Pipeline</h3>
              <Button onClick={handleShow}>+ Create pipeline</Button>
            </div>
            <span>Create a pipeline</span>
          </S.Header>
          <S.Body>0 pipeline(s) selected
            <PipeList />
          </S.Body>
        </S.Container>
      </S.Wrapper>
      <DragAndDrop show={show} handleClose={handleClose} />
    </PageTemplate>
  );
}
