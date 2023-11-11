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

  // const outputFiles = JSON.parse(props)

  const [data, setData] = useState("")

  useEffect(() => {
    const obj = JSON.parse(JSON.parse(props.output))
    console.log("JOSH", obj);
    setData(obj)
  }, [props])
  {console.log("poois", data)}
  return (
    <S.Container>
      <table >
        {Object.keys(data).map(poo => {

          return (
            <>
            <th style={{whiteSpace: "nowrap"}}>
            {poo}
            {Object.entries(data[poo]).map((item, idx) => {
              const [key, value] = item;
              return (
              
                <tr style={{border: "1px solid black", borderCollapse: "collapse"}}>
                  {/* <td style={{border: "1px solid black"}}>{key}</td> */}
                  {/* <td style={{border: "1px solid black", borderCollapse: "collapse"}}>{(new Date(key*1000)).toUTCString()}</td> */}
                  <td style={{border: "1px solid black", borderCollapse: "collapse"}}>{value}</td>
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