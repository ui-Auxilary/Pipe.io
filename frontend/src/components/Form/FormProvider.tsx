import axios from "axios";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react"
import File from '../../test.py'
import getUser from "helper/functions";
import { useAppData } from "helper/AppProvider";
interface UserData {
    [index: string]: string;
}

interface MicroserviceData {
    [index: string]: any;
}

export interface FormContextType {
    currentStep: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
    userData: Record<string, any>
    setUserData: React.Dispatch<React.SetStateAction<{}>>
    microserviceData: Record<string, any>
    setMicroserviceData: React.Dispatch<React.SetStateAction<{}>>,
    submitData(): void
}

export const multiFormContext = createContext<FormContextType>({
    currentStep: 0,
    setStep: () => { },
    userData: {},
    setUserData: () => { },
    microserviceData: {},
    setMicroserviceData: () => { },
    submitData: () => { }
});


export function useFormData() {
    return useContext(multiFormContext);
}

export default function FormProvider({ children }: any) {
    const [currentStep, setStep] = useState<number>(1);
    const [userData, setUserData] = useState<UserData>({})
    const [microserviceData, setMicroserviceData] = useState<MicroserviceData>({});

    const { user } = useAppData()

    const submitData = () => {
        axios.post('http://localhost:8000/pipes/create', Object.assign({ user_id: user }, userData))
        setUserData({})
    }

    return (
        <multiFormContext.Provider value={{ currentStep, setStep, userData, setUserData, microserviceData, setMicroserviceData, submitData }}>
            {children}
        </multiFormContext.Provider>
    )
}
