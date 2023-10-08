import axios from "axios";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react"
import File from '../../test.py'
interface UserData {
    [index: string]: string;
}

export interface FormContextType {
    currentStep: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
    userData: Record<string, any>
    setUserData: React.Dispatch<React.SetStateAction<{}>>
    finalData: Record<string, any>
    setFinalData: React.Dispatch<React.SetStateAction<any[]>>,
    submitData(): void
}

export const multiFormContext = createContext<FormContextType>({
    currentStep: 0,
    setStep: () => { },
    userData: {},
    setUserData: () => { },
    finalData: {},
    setFinalData: () => { },
    submitData: () => { }
});


export function useFormData() {
    return useContext(multiFormContext);
}

export default function FormProvider({ children }: any) {
    const [currentStep, setStep] = useState<number>(1);
    const [userData, setUserData] = useState<UserData>({})
    const [finalData, setFinalData] = useState<Record<string, any>>([]);


    const submitData = () => {
        setUserData(prev => Object.assign(prev, userData))
        console.log('SUBMITTED', userData)
        axios.post('http://localhost:8000/create', userData)
    }

    return (
        <multiFormContext.Provider value={{ currentStep, setStep, userData, setUserData, finalData, setFinalData, submitData }}>
            {children}
        </multiFormContext.Provider>
    )
}
