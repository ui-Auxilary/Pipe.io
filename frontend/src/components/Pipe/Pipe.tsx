import S from './style'
import dots from 'assets/dots.svg'
import view from 'assets/view.svg'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { JsonToTable } from "react-json-to-table";
import StockData from "./stock_data.json"
import ChartComponent from 'components/Visualization/Visualization'

export interface Props {
  id: string
  name: string
  description?: string
}

export default function Pipe({ id, name, description }: Props) {
  const [show, setShow] = useState(false);
  const [showChart, setChart] = useState(false);

  const handleGraphClose = () => setShow(false);
  const handleGraphShow = () => setShow(true);
  const handleChartClose = () => setChart(false);
  const handleChartShow = () => setChart(true);

  return (
    <>
      <S.Pipe>
        <S.Left>
          <span><S.Edit src={dots}></S.Edit></span>
          <div>
            <S.Label>
              <h4 style={{ flex: 1 }}>{name}</h4>
              <span style={{ color: "#B6A4A4" }}>#{id}</span>
            </S.Label>
            <span style={{ fontSize: "15px" }}>{description}</span>
          </div>
        </S.Left>
        <div>
          <div><S.Button onClick={handleChartShow} style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>View <S.View src={view}></S.View></S.Button></div>
          <div><S.Button onClick={handleGraphShow}>View Data</S.Button></div>
        </div>
      </S.Pipe>
      <Modal dialogClassName="form-modal" show={show} onHide={handleGraphClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JsonToTable json={StockData} />
        </Modal.Body>
      </Modal>
      <Modal dialogClassName="form-modal" show={showChart} onHide={handleChartClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChartComponent stockName={"AAPL"} />
        </Modal.Body>
      </Modal>
    </>
  )
}
