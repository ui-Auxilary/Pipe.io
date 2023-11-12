import S from './style';
import Dropzone from 'components/Dropzone';
import { useFormData } from 'components/MultiStepForm/Form/FormProvider';
import UploadMicroservices from 'components/UploadMicroservices';
import ViewMicroservice from 'components/UploadMicroservices/ViewMicroservice';
import { useAppData } from 'helper/AppProvider';
import ValidatedInput from 'helper/validation';
import { useEffect } from 'react';
import Switch from 'react-switch';
import { Item } from 'types/multiForm';

export default function FormItem({ item }: { item: Item }) {
  const { edit, setEdit } = useAppData();
  const { userData, setUserData } = useFormData();

  useEffect(() => {
    if (item.name != undefined) {
      edit[item.name] && setEdit({ ...edit, [item.name]: { ...edit[item.name], [item.label.toLocaleLowerCase()]: item.value } })
      edit[item.name] = { ...edit[item.name], [item.label.toLocaleLowerCase()]: item.value }
    }
  }, [])

  switch (item.type) {
    case 'text':
      return (
        <>
          <S.Label>{item.label}</S.Label>
          <ValidatedInput
            item={item}
            customValidity={item.validation}
            errorMessage={item.errorMessage}
            value={userData[item.label.toLocaleLowerCase()]}
            onChange={(e: InputEvent) => setUserData({ ...userData, [item.label.toLocaleLowerCase()]: (e?.target as HTMLTextAreaElement).value })}
          />
        </>
      );

    case 'dropzone':

      return (
        <>
          <S.Label>{item.label}</S.Label>
          <Dropzone filetype={item.value} />
        </>
      );
    case 'upload_microservices':
      return (
        <UploadMicroservices />
      );
    case 'view_microservices':
      return (
        <ViewMicroservice />
      );
    case 'edit_param':
      console.log('POO', item, edit)

      if (item.elType === 'bool') {
        console.log(item, "BOOL");
        console.log("8==D", edit[item.name]);
        return (
          <>
            <S.Label>{item.label}</S.Label>
            <Switch
              onChange={(e) => {
                setEdit({ ...edit, [item.name]: { ...edit[item.name], [item.label.toLocaleLowerCase()]: e } });
              }}
              checked={edit[item.name] ? edit[item.name][item.label.toLocaleLowerCase()] : item.value || false}
            />
          </>
        );
      }

      return (
        <>
          <S.Label>{item.label}</S.Label>
          <ValidatedInput
            value={edit[item.name] ? edit[item.name][item.label.toLocaleLowerCase()] : item.value || ''}
            item={edit[item.name] ? edit[item.name][item.label.toLocaleLowerCase()] : item.value || ''}
            onChange={(e) => { console.log('EDITING LABEL', item.label, item.name); setEdit({ [item.name]: { ...edit[item.name], [item.label.toLocaleLowerCase()]: e.target.value } }) }}
            customValidity={item.elType}
            isEdit={true}
          />
        </>
      );
  }

  return (
    <div>{item.label}</div>
  )
}
