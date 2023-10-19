import axios from "axios"
import { useEffect, useState } from "react"
import { PaginationControl } from 'react-bootstrap-pagination-control';
import S from './styles'

export default function Result({ pipeId }: { pipeId: string }) {
    const [page, setPage] = useState(1);
    const [result, setResult] = useState({});
    const [pageContent, setPageContent] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/pipes/${pipeId}`).then(res => {
            setResult(res.data)
            let output = Object.entries(res.data.output)[page - 1]
            setPageContent({ ["name"]: output[0], ["output"]: output[1] })
        })

    }, [])

    useEffect(() => {
        if (result?.output) {
            let output = Object.entries(result.output)[page - 1]
            setPageContent({ ["name"]: output[0], ["output"]: output[1] })
        }
    }, [page])

    return (
        <div>
            <h5>{pageContent && <p>{pageContent["name"]} </p>}</h5>
            <S.Body>
                <h6>Output:</h6>
                {pageContent && pageContent["output"]}
            </S.Body>
            {result?.output &&
                <PaginationControl
                    page={page}
                    total={Object.keys(result?.output).length}
                    limit={1}
                    changePage={(page) => {
                        setPage(page)
                    }}
                    ellipsis={1}
                />
            }
        </div>
    )
}
