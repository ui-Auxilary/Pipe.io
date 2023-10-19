import S from './style'
import dots from 'assets/dots.svg'
import { useRef, useState, useEffect } from 'react'
import { Button, Modal, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'
import View from 'assets/view.svg'
import Edit from 'assets/pencil.svg'
import Delete from 'assets/trash.svg'
import Overlay from 'react-bootstrap/Overlay';
import { format} from 'date-fns';


import Content from './Content'
import axios from 'axios'
import { useAppData } from 'helper/AppProvider'
import Result from './Result/Result'

export interface Props {
  pipeId: string
  id: string
  name: string
  description?: string
}


export interface ExecuteProps {
  time: number,
  result: object
}

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

export default function Pipe({ pipeId, id, name, description }: Props) {
  const [show, setShow] = useState(false);
  const [del, setDel] = useState(false);
  const [showChart, setChart] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [executed, setExecuted] = useState<ExecuteProps>();
  const { pipeIds, setPipeIds } = useAppData();

  let target = useRef(null);

  const handleOverlayShow = () => setShow(true);
  const handleDeleteClose = () => setDel(false);
  const handleChartClose = () => setChart(false);
  const handleChartShow = () => setChart(true);

  const onPipeRun = () => {
    if (status === "Completed") {
      handleChartShow();
    } else {
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
    }
  };

  const onEditClick = () => {
    handleOverlayShow()
  }

  const onDeleteClick = () => {
    setDel(true);
    document.body.click()
  }

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/pipes/${pipeId}`, { params: { id: pipeId } }).then(res => console.log('DONE'))
    setPipeIds(pipeIds.filter(pipe => pipe !== pipeId));
    handleDeleteClose();
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/pipes/${pipeId}`).then(res => {
      // setStatus(res.data.status)
      // setExecuted(res.data.executed.last_executed)
      setExecuted(executed => ({ ...executed, "time": res.data.last_executed }))
    })
  }, []);

  const editPipeline = (
    <Popover>
      <Popover.Body>
        <div className="mt-3 mb-1">
          <S.EditBox>
            <S.EditOption>
              <S.View src={Edit} />
              Edit pipeline
            </S.EditOption>
            <S.EditOption>
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
        <S.Top>
          <S.Left>
            <span>
              <OverlayTrigger trigger="click" placement="bottom" overlay={editPipeline} rootClose>
                <S.Edit ref={target} onClick={onEditClick} src={dots} />
              </OverlayTrigger>
            </span>
            <div>
              <Content id={id} name={name} description={description} />
            </div>
          </S.Left>
          <div>
            <div style={{ marginRight: "15px" }}>
              <S.Execute disabled={status == "Running"} onClick={onPipeRun} status={status}>{handleStatus(status)}</S.Execute>
            </div>
          </div>
        </S.Top>
        <S.Bottom>
          <S.Status status={status}>{status.toUpperCase()}</S.Status>
          <S.Label>Last executed: {executed ? executed.time : "Never"}</S.Label>
        </S.Bottom>
      </S.Pipe>
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
