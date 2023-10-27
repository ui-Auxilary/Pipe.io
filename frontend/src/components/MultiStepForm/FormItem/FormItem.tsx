import S from './style';
import Dropzone from 'components/Dropzone';
import { useFormData } from 'components/MultiStepForm/Form/FormProvider';
import MicroserviceList from 'components/MicroserviceList';
import ViewMicroservice from 'components/MicroserviceList/ViewMicroservice';
import { useAppData } from 'helper/AppProvider';
import ValidatedInput from 'helper/validation';
import React, { FormEvent } from 'react';

export interface Item {
  label: string
  type: string
  value: string
  name: string
  validation?: string
  errorMessage?: string
  elType?: string
}

export interface Props {
  item: Item
}

// Update based on question list to render specific component
export default function FormItem({ item }: Props) {
  const { edit, setEdit } = useAppData();
  const { userData, setUserData } = useFormData();
  switch (item.type) {
    case 'text':
      return (
        <>
          <S.Label>{item.label}</S.Label>
          <ValidatedInput
            item={item} customValidity={item.validation}
            errorMessage={item.errorMessage}
            value={userData[item.label.toLocaleLowerCase()]}
            onChange={(e) => setUserData({ ...userData, [item.label.toLocaleLowerCase()]: e.target.value })} />
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
    case 'edit_param':
      return (
        <>
          <S.Label>{item.label}</S.Label>
          <ValidatedInput
            value={edit[item.name] ? edit[item.name][item.label.toLocaleLowerCase()] : item.value || ''}
            onChange={(e) => setEdit({ ...edit, [item.name]: { ...edit[item.name], [item.label.toLocaleLowerCase()]: e.target.value } })}
            item={item}
            customValidity={item.elType}
            edit={true}
          />
        </>
      );
  }

  return (
    <div>{item.label}</div>
  )
}
