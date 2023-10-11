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
  submitData(): void,
  microserviceParam: Record<string, any>,
  setMicroserviceParam: React.Dispatch<React.SetStateAction<{}>>
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

export default function FormProvider({ children }: any) {
  const [currentStep, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<UserData>({})
  const [microserviceData, setMicroserviceData] = useState<MicroserviceData>({});
  const [microserviceParam, setMicroserviceParam] = useState<MicroserviceData>({});

  const { user } = useAppData()

  const submitData = (handleClose) => {
    const data = { user }
    console.log(data)
    axios.post('http://localhost:8000/pipes/create', Object.assign({ user_id: user, microservices: microserviceData.microservices }, userData), {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      }
    })
    handleClose()
    setUserData({})
  }

  return (
    <multiFormContext.Provider value={{ currentStep, setStep, userData, setUserData, microserviceData, setMicroserviceData, submitData, microserviceParam, setMicroserviceParam }}>
      {children}
    </multiFormContext.Provider>
  )
}
