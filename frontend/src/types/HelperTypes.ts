import { ReactNode } from 'react'
import React from 'react'

export interface AppProviderType {
  user: string
  setUser: React.Dispatch<React.SetStateAction<string>>
  pipeIds: string[]
  setPipeIds: React.Dispatch<React.SetStateAction<string[]>>
  edit: Record<number, unknown>,
  setEdit: React.Dispatch<React.SetStateAction<unknown>>
  refData: Record<string, NonNullable<unknown>>,
  setRefData: React.Dispatch<React.SetStateAction<NonNullable<unknown>>>,
  appFiles: (File | string)[],
  setAppFiles: React.Dispatch<React.SetStateAction<(File | string)[]>>
  darkMode: boolean,
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ChildrenProps {
  children?: ReactNode
}

export interface ValidationProps {
  value?: string
  item?: Item
  customValidity?: RegExp
  errorMessage?: string
  isEdit?: boolean
  [el: string]: unknown
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