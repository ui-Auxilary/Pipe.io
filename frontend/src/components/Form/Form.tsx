import FormItem from "components/FormItem"
import { useContext, useEffect, useState } from "react"

import { useFormData } from "./FormProvider"

export interface Item {
    label: string
    type: string
    value: string
}

export default function Form({ questions, step, onFormUpdate, pageAnswers, onSubmit }) {
    const { setStep, currentStep } = useFormData();

    const [answers, setAnswers] = useState({ index: step })

    const updateAnswers = (value, category) => {
        console.log('ANSWRS', value, category, answers)
        setAnswers({ ...answers, [category]: value })
    }

    useEffect(() => {
        console.log('ANSWERS', answers)
        if (Object.keys(answers).length > 1) {
            onFormUpdate(answers.index, answers);
        }
        setAnswers({ index: step })
    }, [step, onSubmit])
    console.log("Questions", questions)



    return (
        <>
            {
                questions && questions[step].items.map((item: Item, index) => (
                    <FormItem key={item.label} item={item} onChange={updateAnswers} answers={pageAnswers[step] ? pageAnswers[step][item.value] : null} />
                ))
            }
        </>
    )
}
