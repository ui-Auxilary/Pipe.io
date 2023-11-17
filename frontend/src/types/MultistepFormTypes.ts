import React from 'react';


export interface MultiFormProps {
  show: boolean;
  handleClose: () => void;
}

export interface FormItemInterface {
  label: string;
  type: string;
  value: string;
  name: number | undefined;
  validation?: RegExp | undefined;
  errorMessage?: string;
  elType?: string;
  id?: string;
}

export interface FormItemProps {
  item: FormItemInterface;
}

export interface FormPageProps {
  itemList: ItemList;
  step: number;
  edit?: boolean;
  onHandleClose: () => void;
}


export interface ItemList {
  items: Item[];
}

export interface FormProviderProps {
  children?: React.ReactNode;
}

export interface Item {
  label: string;
  type: string;
  value: string;
  id: string;
  validation?: RegExp | undefined;
  name: string | undefined;
  errorMessage?: string;
  elType?: string;
}


// export interface FormProps {
//   questions: any;
//   step: number;
//   edit?: boolean;
//   onHandleClose?: () => void;
// }

export interface UserData {
  [index: string]: NonNullable<unknown>;
}

export interface MicroserviceData {
  [index: string]: NonNullable<unknown>;
}

export interface FormContextType {
  currentStep: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userData: Record<string, NonNullable<unknown>>;
  setUserData: React.Dispatch<React.SetStateAction<NonNullable<unknown>>>;
  microserviceData: Record<string, NonNullable<unknown> | []>;
  setMicroserviceData: React.Dispatch<React.SetStateAction<NonNullable<unknown>>>;
  submitData(func?: NonNullable<unknown>): void;
}