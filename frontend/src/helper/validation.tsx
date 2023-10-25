import { useEffect, useRef } from "react"
import S from 'components/MultiStepForm/FormItem/style'
import { useFormData } from "components/MultiStepForm/Form/FormProvider"

export default function ValidatedInput({ item, customValidity, errorMessage, ...downProps }) {
    const ref = useRef(null)
    const { userData, setUserData } = useFormData();

    useEffect(() => {
        if (customValidity !== undefined && ref.current !== null) {
            console.log('Ref', ref.current.value, customValidity, errorMessage)
            if (!ref.current.value) {
                ref.current.setCustomValidity('Field cannot be empty')
            } else if (!customValidity.test(ref.current.value)) {
                ref.current.setCustomValidity(errorMessage)
            } else {
                ref.current.setCustomValidity('')
            }
        }
    }, [customValidity])
    return <S.Input
        value={userData[item.label.toLocaleLowerCase()]}
        onChange={(e) => setUserData({ ...userData, [item.label.toLocaleLowerCase()]: e.target.value })}
        ref={ref}
        {...downProps}
    />
}