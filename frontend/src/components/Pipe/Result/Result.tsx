import axios from "axios"
import { useEffect, useState } from "react"
import { PaginationControl } from 'react-bootstrap-pagination-control';
import S from './styles'
import ChartComponent from "components/Visualization/Visualization";

export default function Result({ pipeId }: { pipeId: string }) {
    const [page, setPage] = useState(1);
    const [result, setResult] = useState({});
    const [pageContent, setPageContent] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/pipes/${pipeId}`).then(res => {
            setResult(res.data)
            let output = Object.entries(res.data.output)[page - 1]
            let outputType = res.data.microservices[page - 1].output_type
            setPageContent({ ["name"]: output[0], ["output"]: output[1], ["output_type"]: outputType })
        })

    }, [])

    useEffect(() => {
        if (result?.output) {
            let output = Object.entries(result.output)[page - 1]
            let outputType = result.microservices[page - 1].output_type
            setPageContent({ ["name"]: output[0], ["output"]: output[1], ["output_type"]: outputType })
        }
    }, [page])

    return (
        <div>
            <h5>{pageContent && <p>{pageContent["name"]} </p>}</h5>
            <S.Body>
                <h6>Output:</h6>
                {checkForStockData(result, pageContent) && <ChartComponent index={page-1} name={pageContent["name"]} pipeId={pipeId} data={pageContent.output} />}
                {pageContent && !checkForStockData(result, pageContent) && pageContent["output"]}
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

// will need to generalise this later
function checkForStockData(result: any, pageContent: any) {
    if (result.output && pageContent.output_type == "graph") {
        return true;
    }
    return false;
}
