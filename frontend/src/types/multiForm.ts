export interface MultiFormProps {
    show: boolean;
    handleClose: () => void;
}

export interface FormPageProps {
    itemList: ItemList[];
    step: number;
    edit: boolean;
    onHandleClose: () => void;
}

export interface Item {
    label: string
    type: string
    value: string
    name: number
    validation?: string
    errorMessage?: string
    elType?: string
    id?: string
}

export interface ItemList {
    items: Item[]
}