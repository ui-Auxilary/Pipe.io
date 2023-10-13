import FormItem from "../FormItem"

export interface Item {
    label: string
    type: string
    value: string
    id: string
}

export default function Form({ questions, step }) {
    console.log('Q', questions)
    return (
        <>
            {
                questions && questions[step].items.map((item: Item) => (
                    <FormItem key={item.label} item={item} />
                ))
            }
        </>
    )
}
