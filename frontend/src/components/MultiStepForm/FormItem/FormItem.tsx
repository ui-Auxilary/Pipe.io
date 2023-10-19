import S from './style';
import Dropzone from 'components/Dropzone';
import { useFormData } from 'components/MultiStepForm/Form/FormProvider';
import MicroserviceList from 'components/MicroserviceList';
import ViewMicroservice from 'components/MicroserviceList/ViewMicroservice';
import { useAppData } from 'helper/AppProvider';

export interface Item {
  label: string
  type: string
  value: string
  id: string
}

export interface Props {
  item: Item
}

// Update based on question list to render specific component
export default function FormItem({ item }: Props) {
  const { setUserData, userData, setMicroserviceParam, microserviceParam } = useFormData();
  const { edit, setEdit } = useAppData();

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
    case 'edit_param':

      switch (item.value) {
        case 'pipe':
          return (
            <>
              <S.Label>{item.label}</S.Label>
              <S.Input value={edit[item.id] ? edit[item.id][item.label.toLocaleLowerCase()] : ''} onChange={(e) => setEdit({ ...edit, [item.id]: { ...edit[item.id], [item.label.toLocaleLowerCase()]: e.target.value } })} />
            </>
          );
        default:
          return (
            <>
              <S.Label>{item.label}</S.Label>
              <S.Input value={microserviceParam[item.id] && microserviceParam[item.id][item.label.toLocaleLowerCase()]} onChange={(e) => setMicroserviceParam({ ...microserviceParam, [item.id]: { ...microserviceParam[item.id], [item.label.toLocaleLowerCase()]: e.target.value } })} />
            </>
          );
      }
  }

  return (
    <div>{item.label}</div>
  )
}
