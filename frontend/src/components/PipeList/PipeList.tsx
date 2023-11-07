import Pipe from "components/Pipe"
import axios from 'axios';

import S from './style'
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppData } from "helper/AppProvider";
export interface Microservice {
    microserviceId: string
    content: string
    userId: string
    pipeId: string
}

export interface Pipe {
    name: string
    description: string
    userId: string
    microservices: Microservice[]
}

export default function PipeList() {
    const [pipes, setPipes] = useState([]);
    const { pipeIds, setPipeIds } = useAppData();
    const [refData, setRefData] = useState({});
    const [checked, setChecked] = useState(false);
    const [numChecked, setNumChecked] = useState(0);
    const checkboxRef = useRef([]);

    const onHandleDelete = () => {
        let itemsChecked = numChecked
        Object.entries(refData).map(([pipeId, isChecked]) => {
            if (isChecked) {
                itemsChecked > 0 ? itemsChecked -= 1 : null;
                axios.delete(`http://localhost:8000/pipes/${pipeId}`, { params: { id: pipeId } }).then(() => { setPipeIds([...pipeIds]) })
                setPipes(pipes.filter(pipe => pipe.pipe_id != pipeId));
            }
        })
        setNumChecked(0)
        setChecked(false);
    }

    const DeselectAll = () => {
        let updatedRefData = refData;
        for (let i = 0; i < checkboxRef.current.length; i++) {
            if (checkboxRef.current[i]) {
                checkboxRef.current[i].checked = false;
                Object.assign(updatedRefData, { [pipes[i]["pipe_id"]]: false })
            }
        }
        setRefData(updatedRefData)
        setNumChecked(0);
    }

    const SelectAll = () => {
        let updatedRefData = refData;
        let setCheck = 0;
        for (let i = 0; i < checkboxRef.current.length; i++) {
            if (checkboxRef.current[i]) {
                checkboxRef.current[i].checked = true;
                setCheck += 1
                Object.assign(updatedRefData, { [pipes[i]["pipe_id"]]: true })
            }
        }
        console.log('Confirm', updatedRefData, setCheck, checkboxRef.current.length)
        setRefData(updatedRefData)
        setNumChecked(setCheck);
    }

    const pipeChecked = useCallback((pipeId: string, id: number) => {
        setRefData(prev => ({ ...prev, [pipeId]: checkboxRef.current[id].checked }))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/pipes/list', {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then(res => {
            console.log("PIPES", res.data)
            setPipes(res.data)
        }).catch(err => console.log(err))
    }, [pipeIds])

    useEffect(() => {
        let res = checkboxRef?.current?.filter(x => !!x).filter(x => x?.checked === true)
        res.length ? setChecked(true) : setChecked(false)
        setNumChecked(res.length)
    }, [refData])

    return (
        <S.Container>
            {checked && (
                <S.Row>
                    <S.Options>
                        <span>{numChecked} pipe(s) selected</span>
                    </S.Options>
                    <S.Options>
                        <S.SelectAll onClick={numChecked != pipes.length ? SelectAll : DeselectAll}>{numChecked != pipes.length ? "Select all" : "Deselect all"}</S.SelectAll>
                        <S.Delete onClick={onHandleDelete}>Delete selected</S.Delete>
                    </S.Options>
                </S.Row>
            )}
            {pipes.map(({ pipe_id, name, description }, index) => (
                <Pipe key={pipe_id} pipeId={pipe_id} id={`00${index + 1} `} name={name} description={description} onCheck={pipeChecked} ref={checkboxRef} idx={index} />
            ))}
        </S.Container>
    )
}
