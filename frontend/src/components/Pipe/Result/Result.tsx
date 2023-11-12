import axios from "axios"
import { useEffect, useState } from "react"
import { PaginationControl } from 'react-bootstrap-pagination-control';
import S from './styles'
import ChartComponent from "components/Visualization/Visualization";
import Download from "./Download/Download";
import DownloadCSV from "./CSV/DownloadCSV";



export default function Result({ pipeId }: { pipeId: string }) {
    const [page, setPage] = useState(1);
    const [result, setResult] = useState({});
    const [pageContent, setPageContent] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/pipes/${pipeId}`).then(res => {
            setResult(res.data)
            const output = Object.entries(res.data.output)[page - 1]
            const outputType = res.data.microservices[page - 1].output_type
            setPageContent({ ["name"]: output[0], ["output"]: output[1], ["output_type"]: outputType })
        })

    }, [page])

    useEffect(() => {
        if (result?.output) {
            const output = Object.entries(result.output)[page - 1]
            const outputType = result.microservices[page - 1].output_type
            setPageContent({ ["name"]: output[0], ["output"]: output[1], ["output_type"]: outputType })
        }

    }, [page])

    return (
        <S.Container>
            <h5>{pageContent && <p>{pageContent["name"]} </p>}</h5>
            <S.Body>
                <h6>Output:</h6>
                {checkForStockData(result, pageContent) && <ChartComponent index={page - 1} name={pageContent["name"]} pipeId={pipeId} data={pageContent.output} />}
                {pageContent && checkForValue(result, pageContent) && pageContent["output"]}
                {checkForPlot(result, pageContent) && <Download pipeId={pipeId} output={pageContent["output"]} />}
                {checkForCSV(result, pageContent) && <DownloadCSV pipeId={pipeId} output={pageContent["output"]} name={pageContent["name"]} />}
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

        </S.Container>
    )
}


function checkForStockData(result: any, pageContent: any) {
    if (result.output && pageContent.output_type == "graph") {
        return true;
    }
    return false;
}

function checkForPlot(result: any, pageContent: any) {
    if (result.output && pageContent.output_type == "plot") {
        return true;
    }
    return false;
}

function checkForValue(result: any, pageContent: any) {
    if (result.output && pageContent.output_type == "value") {
        return true;
    }
    return false;
}

function checkForCSV(result: any, pageContent: any) {
    if (result.output && pageContent.output_type == "csv") {
        return true;
    }
    return false;
}
