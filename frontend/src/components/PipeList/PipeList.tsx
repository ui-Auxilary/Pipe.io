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
        console.log(refData)
        Object.entries(refData).map(([pipeId, isChecked]) => {
            if (isChecked) {
                // Delete
                setNumChecked(numChecked - 1);
                axios.delete(`http://localhost:8000/pipes/${pipeId}`, { params: { id: pipeId } }).then(() => {setPipeIds([...pipeIds])})
            }
        })
    }

    const DeselectAll = () => {
        let updatedRefData = refData;
        for (let i = 0; i < checkboxRef.current.length; i++) {
            checkboxRef.current[i].checked = false;
            Object.assign(updatedRefData, {[pipes[i]["pipe_id"]]: false })
        }
        setRefData(updatedRefData)
        setNumChecked(0);
    }

    const SelectAll = () => {
        console.log('check pipes', refData);
        let updatedRefData = refData;
        for (let i = 0; i < checkboxRef.current.length; i++) {
            checkboxRef.current[i].checked = true;
            Object.assign(updatedRefData, {[pipes[i]["pipe_id"]]: true })  
        }
        setRefData(updatedRefData)
        setNumChecked(pipeIds.length);
    }

    const pipeChecked = useCallback((pipeId: string, id: number) => {
        checkboxRef.current[id].checked = !checkboxRef.current[id].checked;
        setRefData(prev => ({...prev, [pipeId]: checkboxRef.current[id].checked}))
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
        let res = checkboxRef?.current?.filter(x => x.checked === true)
        res.length ? setChecked(true) : setChecked(false)
        console.log('REs', res, refData)
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
                        <S.SelectAll onClick={numChecked != checkboxRef.current.length ? SelectAll : DeselectAll}>{numChecked != checkboxRef.current.length ? "Select all" : "Deselect all"}</S.SelectAll>
                        <S.Delete onClick={onHandleDelete}>Delete selected</S.Delete>
                    </S.Options>
                </S.Row>
            )}
            {pipes.map(({ pipe_id, name, description }, index) => (
                <Pipe key={pipe_id} pipeId={pipe_id} id={`00${index + 1} `} name={name} description={description} onCheck={pipeChecked} ref={checkboxRef} idx={index}/>
            ))}
        </S.Container>
    )
}
