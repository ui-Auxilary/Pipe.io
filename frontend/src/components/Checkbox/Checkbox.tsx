export default function Checkbox({ id, type, name, handleClick, isChecked }) {
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
