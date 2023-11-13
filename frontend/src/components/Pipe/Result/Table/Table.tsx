import axios from "axios"
import { useEffect, useState } from "react"
import S from './Styles'
import Button from 'react-bootstrap/Button';
import fileImg from './file-svgrepo-com.svg'



interface prop {
  pipeId: string
  output: string
  name: string
}


export default function Table(props: prop) {
  const [data, setData] = useState("")

  useEffect(() => {
    const obj = JSON.parse(props.output)
    setData(obj)
  }, [props])
  return (
    <S.Container>
      <table style={{border: "1px solid black", borderCollapse: "collapse"}}>
        {Object.keys(data).map(poo => {

          return (
            <>
            <th style={{whiteSpace: "nowrap", width: "10000px"}}>
            {poo}
            {Object.entries(data[poo]).map((item, idx) => {
              const [key, value] = item;
              return (
              
                <tr style={{border: "1px solid black", borderCollapse: "collapse"}}>
                  <td style={{border: "1px solid black", borderCollapse: "collapse"}}>{(value > 166814280000) ? (new Date(value)).toUTCString() : value}</td>
                </tr>
              
              );
          })}
          </th>
          </>
          );
})}
      </table>
    </S.Container>
  )
}