import { useFormData } from "../Form/FormProvider";

export default function FormErrors() {
    const { error } = useFormData();
    const { formErrors } = error;
    return (
        <>
            {
                Object.keys(formErrors).map((fieldName, i) => {
                    if (formErrors[fieldName].length > 0) {
                        return (
                            <p key={i}>- {formErrors[fieldName]}</p>
                        )
                    } else {
                        return '';
                    }
                })
            }
        </>
    )
}
