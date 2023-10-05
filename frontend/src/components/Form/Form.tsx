import FormItem from "components/FormItem"
import { useEffect, useState } from "react"

export interface Item {
    label: string
    type: string
    value: string
}

export default function Form({ questions, step, onFormUpdate, pageAnswers, onSubmit }) {
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
        questions[step].items.map((item: Item, index) => (
            <FormItem key={item.label} item={item} onChange={updateAnswers} answers={pageAnswers[step] ? pageAnswers[step][item.value] : null} />
        ))
    )
}
