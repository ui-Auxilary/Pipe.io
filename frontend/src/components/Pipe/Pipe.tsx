import S from './style'
import dots from 'assets/dots.svg'
import React, { forwardRef, useRef, useState, useEffect } from 'react'
import { Button, Modal, OverlayTrigger, Popover } from 'react-bootstrap'
import View from 'assets/view.svg'
import Pencil from 'assets/pencil.svg'
import Edit from 'components/Edit'
import Delete from 'assets/trash.svg'
import { format } from 'date-fns';


import Content from './Content'
import axios from 'axios'
import { useAppData } from 'helper/AppProvider'
import Result from './Result/Result'
import ViewMicroserviceFromPipe from 'components/MicroserviceList/ViewMicroservice/ViewMicroserviceFromPipe';
export interface Props {
  pipeId: string
  id: string
  name: string
  description?: string
  checked?: boolean
  onCheck: (pipeId: string, id: number) => void
  ref: React.MutableRefObject<never[]>
  idx: number
}


export interface ExecuteProps {
  time: number,
  result: object
}


const Pipe = forwardRef(({ pipeId, id, name, description, onCheck, idx }: Props, ref) => {
  const [show, setShow] = useState(false);
  const [showView, setShowView] = useState(false);
  const [del, setDel] = useState(false);
  const [showChart, setChart] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [executed, setExecuted] = useState<ExecuteProps>();
  const { pipeIds, setPipeIds, setAppFiles } = useAppData();

  const handleStatus = (status: string) => {
    switch (status) {
      case "Ready":
        return "Run"
      case "Completed":
        return "View Results"
      case "Error":
        return "Retry"
      default:
        return status
    }
  }

  const data = {
    name: name,
    description: description
  }

  const items = Object.keys(data).map((el) => (
    { label: el, "type": "edit_param", id: pipeId, name: pipeId }
  ))

  const pipeList = [
    {
      section: 1,
      items: items
    }
  ]

  const target = useRef(null);

  const handleOverlayShow = () => setShow(true);
  const handleOverlayClose = () => { setShow(false); setAppFiles([]) }
  const handleViewOverlayShow = () => setShowView(true);
  const handleViewOverlayClose = () => { setShowView(false); setAppFiles([]) }
  const handleDeleteClose = () => setDel(false);
  const handleChartClose = () => setChart(false);
  const handleChartShow = () => setChart(true);

  const onPipeRun = () => {
    if (status === "Completed") {
      handleChartShow();
    } else {
      executePipe();
    }
  };

  const executePipe = () => {
    setStatus("Running");
    axios.post('http://localhost:8000/pipes/execute/', null, { params: { id: pipeId } })
      .then(res => {
        setStatus("Completed");
        setExecuted({ "time": format(Date.now(), 'yyyy-MM-dd HH:mm:ss'), "result": res.data });
      })
      .catch((e: any) => {
        setStatus("Error");
        console.log(e);
      });
  };

  const onEditClick = () => {
    handleOverlayShow()
    document.body.click()
  }

  const onViewClick = () => {
    handleViewOverlayShow()
    document.body.click()
  }

  const onDeleteClick = () => {
    setDel(true);
    document.body.click()
  }

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/pipes/${pipeId}`, { params: { id: pipeId } }).then(() => setPipeIds(pipeIds.filter(pipe => pipe !== pipeId)))

    handleDeleteClose();
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/pipes/${pipeId}`).then(res => {
      // setStatus(res.data.status)
      // setExecuted(res.data.executed.last_executed)
      setExecuted(executed => ({ ...executed, "time": res.data.last_executed }))
      if (res.data.status == "Error") {
        setStatus("Error")
      } else if (res.data.last_executed) {
        setStatus("Completed")
      }
    })
  }, []);

  const editPipeline = (
    <Popover>
      <Popover.Body>
        <div className="mt-3 mb-1">
          <S.EditBox>
            <S.EditOption onClick={onEditClick}>
              <S.View src={Pencil} />
              Edit pipeline
            </S.EditOption>
            <S.EditOption onClick={onViewClick}>
              <S.View src={View} />
              View microservices
            </S.EditOption>
            <S.EditOption onClick={onDeleteClick}>
              <S.View src={Delete} />
              Delete
            </S.EditOption>
          </S.EditBox>
        </div>
      </Popover.Body>
    </Popover>
  );


  return (
    <>
      <S.Pipe>
        <OverlayTrigger trigger="click" placement="bottom" overlay={editPipeline} rootClose>
          <S.Edit ref={target} src={dots} />
        </OverlayTrigger>
        <S.Top>
          <S.Left>
            <S.CheckboxContainer>
              <S.Checkbox onClick={() => onCheck(pipeId, idx)} defaultChecked={ref.current[idx]?.checked || false} ref={(el) => ref.current[idx] = el} />
            </S.CheckboxContainer>
            <span>
            </span>
            <div>
              <Content id={id} name={name} description={description} />
            </div>
          </S.Left>
          <div>
            <div style={{ marginRight: "15px" }}>
              {status == "Completed" && <S.Execute onClick={executePipe} status={status + "rerun"}>{"Re-run"}</S.Execute>}
              <S.Execute disabled={status == "Running"} onClick={onPipeRun} status={status}>{handleStatus(status)}</S.Execute>
            </div>

          </div>
        </S.Top>
        <S.Bottom>
          <S.Status status={status}>{status.toUpperCase()}</S.Status>
          <S.Label>Last executed: {executed ? executed.time : "Never"}</S.Label>
        </S.Bottom>
      </S.Pipe >
      <Edit id={pipeId} show={show} params={pipeList} data={data} closeOverlay={handleOverlayClose} type={"pipe"} />
      <Modal dialogClassName="form-modal" show={showView} onHide={handleViewOverlayClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name} Microservices</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewMicroserviceFromPipe pipeId={pipeId} />
        </Modal.Body>
        <Modal.Footer>
          <S.Button onClick={() => handleViewOverlayClose()}>Save</S.Button>
        </Modal.Footer>
      </Modal>

      <Modal dialogClassName="form-modal" show={showChart} onHide={handleChartClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Result pipeId={pipeId} />
        </Modal.Body>
      </Modal>
      <Modal show={del} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Pipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleDeleteClose}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
);
export default Pipe;