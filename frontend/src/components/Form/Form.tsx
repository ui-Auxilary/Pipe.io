import FormItem from "components/FormItem"
import { useContext, useEffect, useState } from "react"

import { useFormData } from "./FormProvider"

export interface Item {
    label: string
    type: string
    value: string
}

export default function Form({ questions, step }) {
    console.log('Q', questions)
    return (
        <>
            {
                questions && questions[step].items.map((item: Item, index) => (
                    <FormItem key={item.label} item={item} />
                ))
            }
        </>
    )
}
