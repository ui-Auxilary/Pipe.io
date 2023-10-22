import { useEffect, useState } from 'react'
import { useFormData } from '../Form/FormProvider';
import { Item } from './FormItem';

export const useField = (type: string, item: Item) => {
    const { setUserData, userData, setError, error } = useFormData();
    const [value, setValue] = useState('');
    // const rule = { regex: /^[a-zA-Z]{1,25}$/, requirements: 'Must be cool\n and cool', required: true }
    let rule: RegExp = /(.|\s)*\S(.|\s)*/;
    const validateField = async (label: string) => {

        let requirement: string = '';
        let field: string = "";
        console.log('LABEL', label)
        switch (label) {
            case 'Name':
                rule = /^[a-zA-Z]{1,25}$/
                requirement = 'Name must be between 1-25 characters'
                field = 'nameValid'
                break;
            default:
                break;
        }
        console.log('kay', error, rule.test(value), value)


        let labelValid = error["formErrors"][label] || value ? (rule.test(value) ? '' : requirement) : 'One or more field(s) are blank'

        console.log('CHECK', rule, rule.test(value), field, labelValid, error.nameValid)
        setError({ ...error, ["formErrors"]: { ...error["formErrors"] } })

        console.log('lenhgth', labelValid.length, label)
        if (label === "Name") {
            console.log('Setting', rule.test(value))
            setError({ ...error, ["nameValid"]: rule.test(value) })
        }
    }

    // if (required && !value) setError({ ...error, [item?.label?.toLocaleLowerCase()]: 'Field must not be blank!' });

    // if (rule && !rule.regex.test(value)) setError({ ...error, [item?.label?.toLocaleLowerCase()]: validation.rule.requirements })

    useEffect(() => {
        const { nameValid } = error;
        console.log("valid?", nameValid)
        validateField(item.label)
        nameValid && setError({ ...error, ["formValid"]: true })
    }, [value])

    const onChange = (e: { target: { value: any; }; }) => {
        console.log("POO", e.target.value)

        setError({ ...error, [item.label]: rule })
        setUserData({ ...userData, [item.label.toLocaleLowerCase()]: e.target.value })
        setValue(e.target.value);
    }

    return {
        type,
        onChange
    }
}