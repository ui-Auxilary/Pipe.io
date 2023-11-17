import PageTemplate from "components/PageTemplate/PageTemplate";
import MultiStepForm from "components/MultiStepForm";
import Sidebar from "../../components/Sidebar";
import S from "./style";
import { useEffect, useState } from "react";
import PipeList from "components/PipeList/PipeList";
import FormProvider from "components/MultiStepForm/Form/FormProvider";
import { useAppData } from "helper/AppProvider";
import getUser from "helper/functions";
import Header from "components/Header";

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
    }).catch((error) => {
      if (error.response.status === 401) {
        sessionStorage.removeItem("token");
        window.location.href = "/login";
      }
    })

  }, [])

  return (
    <PageTemplate>
      <S.Wrapper>
        <Sidebar />
        <S.Container>
          <Header handleShow={handleShow} />
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
