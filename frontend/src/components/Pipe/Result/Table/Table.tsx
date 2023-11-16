import { useEffect, useState } from "react"
import S from './styles'


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
      <S.Table>
        {Object.keys(data).map(col => {

          return (
            <>
              <S.TableHead>
                {col}
                {Object.entries(data[col]).map((item) => {
                  const [key, value] = item;
                  return (

                    <S.TableRow>
                      <S.TableData>{(value > 166814280000) ? (new Date(value)).toUTCString() : value}</S.TableData>
                    </S.TableRow>

                  );
                })}
              </S.TableHead>
            </>
          );
        })}
      </S.Table>
    </S.Container>
  )
}