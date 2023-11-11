import PageTemplate from "components/PageTemplate/PageTemplate";
import MultiStepForm from "components/MultiStepForm";

import Button from "react-bootstrap/Button";

import Sidebar from "../../components/Sidebar";
import S from "./style";

import { useEffect, useState } from "react";
import PipeList from "components/PipeList/PipeList";
import FormProvider from "components/MultiStepForm/Form/FormProvider";
import { useAppData } from "helper/AppProvider";
import getUser from "helper/functions";

export default function Home() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (sessionStorage.getItem("token") === null) {
    window.location.href = "/login";
  }

  const { setUser } = useAppData()

  useEffect(() => {
    getUser().then(({ user }) => {
      setUser(JSON.parse(user).id)
    })

  }, [])

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
          <S.Body>
            <PipeList />
          </S.Body>
        </S.Container>
      </S.Wrapper>
      <FormProvider>
        <MultiStepForm show={show} handleClose={handleClose} />
      </FormProvider>
    </PageTemplate>
  );
}
