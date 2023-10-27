import { useEffect, useRef } from "react"
import S from 'components/MultiStepForm/FormItem/style'
import { useFormData } from "components/MultiStepForm/Form/FormProvider"

interface ValidationProps {
    item: any
    customValidity?: any
    errorMessage?: string
    edit: boolean
    [el: string]: any
}
export default function ValidatedInput({ item, customValidity, errorMessage, edit, ...downProps }: ValidationProps) {
    const ref = useRef(null);

    useEffect(() => {
        console.log('Validating')
        if (customValidity !== undefined && ref.current !== null) {
            console.log('Ref', ref.current.value, customValidity, errorMessage)
            if (!ref.current.value) {
                console.log('Setting empty')
                ref.current.setCustomValidity('Field cannot be empty')
            } else if (edit) {
                console.log('WAS EDIT')
                ref.current.setCustomValidity('OOGA BOOGA')
                console.log(edit, item)
            } else if (!customValidity.test(ref.current.value)) {
                ref.current.setCustomValidity(errorMessage)
            } else {
                ref.current.setCustomValidity('')
            }
        }
    }, [customValidity])
    return <S.Input

        ref={ref}
        {...downProps}
    />
}