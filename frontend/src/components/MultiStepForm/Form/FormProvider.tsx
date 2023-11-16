import axios from "axios";
import React, { ReactNode } from "react";
import { createContext, useContext, useState } from "react"

import { useAppData } from "helper/AppProvider";
import getUser from "helper/functions";
import { UserData, MicroserviceData, FormContextType } from "types/MultistepFormTypes";
import { FormProviderProps } from "types/MultistepFormTypes";


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



export default function FormProvider({ children }: FormProviderProps) {
  const [currentStep, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<UserData>({})
  const [microserviceData, setMicroserviceData] = useState<MicroserviceData>({});

  const { user, setPipeIds, pipeIds, setEdit, setAppFiles } = useAppData()

  const submitData = (handleClose: any) => {
    axios.post('http://localhost:8000/pipes/create', Object.assign({ user_id: user, microservices: microserviceData.microservices }, userData), {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      }
    }).then((res: any) => setPipeIds((prevIds: any) => [...prevIds, res?.data?.pipeId]))
    handleClose()
    setUserData({})
    setEdit({})
    setMicroserviceData({})
    setAppFiles([])
  }

  return (
    <multiFormContext.Provider value={{ currentStep, setStep, userData, setUserData, microserviceData, setMicroserviceData, submitData }}>
      {children}
    </multiFormContext.Provider>
  )
}
