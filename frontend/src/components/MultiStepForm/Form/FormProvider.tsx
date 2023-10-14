import axios from "axios";
import React, { ReactNode } from "react";
import { createContext, useContext, useState } from "react"

import { useAppData } from "helper/AppProvider";
interface UserData {
  [index: string]: NonNullable<unknown>;
}

interface MicroserviceData {
  [index: string]: NonNullable<unknown>;
}

export interface FormContextType {
  currentStep: number,
  setStep: React.Dispatch<React.SetStateAction<number>>
  userData: Record<string, NonNullable<unknown>>
  setUserData: React.Dispatch<React.SetStateAction<NonNullable<unknown>>>
  microserviceData: Record<string, NonNullable<unknown>>
  setMicroserviceData: React.Dispatch<React.SetStateAction<NonNullable<unknown>>>,
  submitData(func?: NonNullable<unknown>): void,
  microserviceParam: Record<string, NonNullable<unknown>>,
  setMicroserviceParam: React.Dispatch<React.SetStateAction<NonNullable<unknown>>>
}

export const multiFormContext = createContext<FormContextType>({
  currentStep: 0,
  setStep: () => { },
  userData: {},
  setUserData: () => { },
  microserviceData: {},
  setMicroserviceData: () => { },
  submitData: () => { },
  microserviceParam: {},
  setMicroserviceParam: () => { }
});


export function useFormData() {
  return useContext(multiFormContext);
}

interface FormProviderProps {
  children?: ReactNode
}

export default function FormProvider({ children }: FormProviderProps) {
  const [currentStep, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<UserData>({})
  const [microserviceData, setMicroserviceData] = useState<MicroserviceData>({});
  const [microserviceParam, setMicroserviceParam] = useState<MicroserviceData>({});

  const { user, setPipeIds, pipeIds } = useAppData()

  const submitData = (handleClose) => {
    console.log('USER', user)
    axios.post('http://localhost:8000/pipes/create', Object.assign({ user_id: user, microservices: microserviceData.microservices }, userData), {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      }
    }).then(res => setPipeIds(prevIds => [...prevIds, res?.data?.pipeId]))
    console.log('NEW IDS', pipeIds)
    handleClose()
    setUserData({})
  }

  return (
    <multiFormContext.Provider value={{ currentStep, setStep, userData, setUserData, microserviceData, setMicroserviceData, submitData, microserviceParam, setMicroserviceParam }}>
      {children}
    </multiFormContext.Provider>
  )
}
