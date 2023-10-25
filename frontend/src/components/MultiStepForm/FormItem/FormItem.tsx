import S from './style';
import Dropzone from 'components/Dropzone';
import { useFormData } from 'components/MultiStepForm/Form/FormProvider';
import MicroserviceList from 'components/MicroserviceList';
import ViewMicroservice from 'components/MicroserviceList/ViewMicroservice';
import { useAppData } from 'helper/AppProvider';
import ValidatedInput from 'helper/validation';
import { FormEvent } from 'react';

export interface Item {
  label: string
  type: string
  value: string
  id: string
  validation?: string
  errorMessage?: string
}

export interface Props {
  item: Item
}

// Update based on question list to render specific component
export default function FormItem({ item }: Props) {
  const { edit, setEdit } = useAppData();

  switch (item.type) {
    case 'text':
      return (
        <>
          <S.Label>{item.label}</S.Label>
          <ValidatedInput item={item} customValidity={item.validation} errorMessage={item.errorMessage} />
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
          <S.Input value={edit[item.id] ? edit[item.id][item.label.toLocaleLowerCase()] : ''} onChange={(e) => setEdit({ ...edit, [item.id]: { ...edit[item.id], [item.label.toLocaleLowerCase()]: e.target.value } })} />
        </>
      );
  }

  return (
    <div>{item.label}</div>
  )
}
