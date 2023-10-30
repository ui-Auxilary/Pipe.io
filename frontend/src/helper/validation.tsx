import { useEffect, useRef } from "react"
import S from 'components/MultiStepForm/FormItem/style'
import { useFormData } from "components/MultiStepForm/Form/FormProvider"
import { useAppData } from "./AppProvider"

interface ValidationProps {
    value?: any
    item?: string
    customValidity?: any
    errorMessage?: string
    isEdit?: boolean
    [el: string]: any
}

export default function ValidatedInput({ item, customValidity, errorMessage, isEdit, ...downProps }: ValidationProps) {
    const ref = useRef(null);
    const { edit } = useAppData();
    let stringTest = /^[a-zA-Z0-9_. ]*$/
    let numTest = /^[0-9 ]{1,}$/
    let objTest = /^(?!\s*:\s*)(?:\{[^}]*\})$/
    let listTest = /^(?!\s*:\s*)(?:\[[^}]*\])$/
    let boolTest = /^([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])$/

    const matchType = (value: any, type: string): boolean => {
        console.log('MATCHING Value', value, 'type', type)
        if (!type || !value) {
            return true;
        }
        else if (numTest.test(value) && type === "int") {
            return true;
        } else if (stringTest.test(value) && type === "str") {
            return true;
        } else if (objTest.test(value) && type === "object") {
            return true;
        } else if (listTest.test(value) && type === "list") {
            return true;
        } else if (boolTest.test(value) && type === "bool") {
            return true;
        }
        return false;
    }

    useEffect(() => {
        console.log('Validating', isEdit, item, edit)
        if (customValidity !== undefined && ref.current !== null) {
            console.log('Ref', ref.current.value, customValidity, errorMessage)

            if (!ref.current.value) {
                ref.current.setCustomValidity('Field cannot be empty')
            } else {
                ref.current.setCustomValidity('')

                if (isEdit) {
                    if (matchType(item, customValidity)) {
                        ref.current.setCustomValidity('')
                    } else {
                        ref.current.setCustomValidity(`Invalid type, expected ${customValidity}`)
                    }
                } else if (!customValidity.test(ref.current.value)) {
                    ref.current.setCustomValidity(errorMessage)
                }

            }
        }

    }, [customValidity, item])
    return <S.Input

        ref={ref}
        {...downProps}
    />
}