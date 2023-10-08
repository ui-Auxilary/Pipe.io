import { useContext, useState } from 'react';
import S from './style';
import Dropzone from 'components/DragAndDrop/Dropzone';
import { multiFormContext, updateFormData, useFormData } from 'components/Form/FormProvider';
import { Modal, ModalFooter } from 'react-bootstrap';
import MicroserviceList from 'components/MicroserviceList';
import ViewMicroservice from 'components/MicroserviceList/ViewMicroservice';

export interface Item {
  label: string
  type: string
  value: string
}

export interface Props {
  item: Item
}

// Update based on question list to render specific ocmponent
export default function FormItem({ item }: Props) {
  const { setUserData, userData, submitData, currentStep } = useFormData();

  switch (item.type) {
    case 'text':
      return (
        <>
          <S.Label>{item.label}</S.Label>
          <S.Input value={userData[item.label.toLocaleLowerCase()]} onChange={(e) => setUserData({ ...userData, [item.label.toLocaleLowerCase()]: e.target.value })} />
        </>
      );

    case 'dropzone':

      return (
        <>
          <S.Label>{item.label}</S.Label>
          <Dropzone filetype={item.value} />
        </>
      );
    case 'list_microservices':
      return (
        <MicroserviceList />
      );
    case 'view_microservices':
      return (
        <ViewMicroservice />
      );
  }

  return (
    <div>{item.label}</div>
  )
}