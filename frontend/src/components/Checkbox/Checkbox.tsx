import { CheckBoxProps } from "types/CheckBox"

export default function Checkbox({ id, type, name, handleClick, isChecked }: CheckBoxProps) {
    return (
        <input
            id={id}
            type={type}
            name={name}
            onChange={handleClick}
            checked={isChecked}
        />
    )
}
