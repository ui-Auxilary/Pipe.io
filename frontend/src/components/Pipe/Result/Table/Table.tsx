import { useEffect, useState } from "react"
import S from './styles'
import { TableProps } from "types/TableTypes"

export default function Table({ output }: TableProps) {
  const [data, setData] = useState<Record<string, object>>({})

  useEffect(() => {
    const obj = JSON.parse(output)
    setData(obj)
  }, [output])
  return (
    <S.Container>
      <S.Table>
        {Object.keys(data).map(col => {
          console.log('TABLE DATA', data)
          return (
            <>
              <S.TableHead>
                {col}
                {Object.entries(data[col]).map((item) => {
                  const [key, value] = item;
                  return (

                    <S.TableRow key={key}>
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