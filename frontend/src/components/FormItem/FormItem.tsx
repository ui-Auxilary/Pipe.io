import { useState } from 'react';
import S from './style';
import Dropzone from 'components/DragAndDrop/Dropzone';

{/* <S.Form>
            <S.Label>Name</S.Label>
            <S.Input type="text" name="name" />
            <S.Label>Description</S.Label>
            <S.Textarea />
          </S.Form>
          <S.Label>Data source</S.Label>
          <Dropzone /> */}

export interface Item {
  label: string
  type: string
  value: string
}

export interface Props {
  item: Item
  onChange: (value: any, category: any) => void
  answers: any
}

// Update based on question list to render specific ocmponent
export default function FormItem({ item, onChange, answers }: Props) {
  const [currentValue, setCurrentValue] = useState(answers || null);

  const handleChange = (value) => {
    setCurrentValue(value);
    onChange(value, item.value);
  }

  switch (item.type) {
    case 'text':
      return (
        <>
          <S.Label>{item.label}</S.Label>
          <S.Input value={currentValue} type={item.type} onChange={(e) => handleChange(e.target.value)} />
        </>
      );

    case 'dropzone':
      return (
        <>
          <S.Label>{item.label}</S.Label>
          <Dropzone />
        </>
      );
  }
  return (

    <div>{item.label}</div>
  )
}
