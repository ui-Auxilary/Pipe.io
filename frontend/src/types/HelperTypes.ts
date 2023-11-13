import { ReactNode } from 'react'
import React from 'react'

export interface AppProviderType {
  user: string
  setUser: React.Dispatch<React.SetStateAction<string>>
  pipeIds: string[]
  setPipeIds: React.Dispatch<React.SetStateAction<string[]>>
  edit: Record<number, any>,
  setEdit: React.Dispatch<React.SetStateAction<any>>
  refData: Record<string, NonNullable<unknown>>,
  setRefData: React.Dispatch<React.SetStateAction<NonNullable<unknown>>>,
  appFiles: File[],
  setAppFiles: React.Dispatch<React.SetStateAction<File[]>>
}

export interface ChildrenProps {
  children?: ReactNode
}

export interface ValidationProps {
  value?: any
  item?: Item
  customValidity?: any
  errorMessage?: string
  isEdit?: boolean
  [el: string]: any
}

interface Item {
  label: string
  type: string
  value: string
  name: number
  validation?: string
  errorMessage?: string
  elType?: string
  id?: string
}