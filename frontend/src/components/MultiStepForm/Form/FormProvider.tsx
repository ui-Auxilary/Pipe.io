import axios from "axios";
import React, { ReactNode } from "react";
import { createContext, useContext, useState } from "react"

import { useAppData } from "helper/AppProvider";
import getUser from "helper/functions";
interface UserData {
  [index: string]: NonNullable<unknown>;
}

export interface FormContextType {
  currentStep: number,
  setStep: React.Dispatch<React.SetStateAction<number>>
  userData: Record<string, NonNullable<unknown>>
  setUserData: React.Dispatch<React.SetStateAction<NonNullable<unknown>>>
  microserviceData: object[]
  setMicroserviceData: React.Dispatch<React.SetStateAction<object[]>>,
  submitData(func?: NonNullable<unknown>): void
}

export const multiFormContext = createContext<FormContextType>({
  currentStep: 0,
  setStep: () => { },
  userData: {},
  setUserData: () => { },
  microserviceData: [],
  setMicroserviceData: () => { },
  submitData: () => { }
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
  const [microserviceData, setMicroserviceData] = useState<object[]>([]);

  const { user, setPipeIds, pipeIds, setEdit } = useAppData()

  const submitData = (handleClose) => {
    console.log('USER', microserviceData)
    axios.post('http://localhost:8000/pipes/create', Object.assign({ user_id: user, microservices: microserviceData }, userData), {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      }
    }).then(res => setPipeIds(prevIds => [...prevIds, res?.data?.pipeId]))
    console.log('NEW IDS', pipeIds)
    handleClose()
    setUserData({})
    setEdit({})
    setMicroserviceData([])
  }

  return (
    <multiFormContext.Provider value={{ currentStep, setStep, userData, setUserData, microserviceData, setMicroserviceData, submitData }}>
      {children}
    </multiFormContext.Provider>
  )
}
