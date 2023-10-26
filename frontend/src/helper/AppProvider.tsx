import React, { ReactNode, createContext, useContext, useState } from "react"

export interface AppProviderType {
    user: string
    setUser: React.Dispatch<React.SetStateAction<string>>
    pipeIds: string[]
    setPipeIds: React.Dispatch<React.SetStateAction<string[]>>
    edit: Record<string, NonNullable<unknown>>,
    setEdit: React.Dispatch<React.SetStateAction<NonNullable<unknown>>>
    refData: Record<string, NonNullable<unknown>>,
    setRefData: React.Dispatch<React.SetStateAction<NonNullable<unknown>>>
}

export const AppProviderContext = createContext<AppProviderType>({
    user: "",
    setUser: () => { },
    pipeIds: [],
    setPipeIds: () => { },
    edit: {},
    setEdit: () => { },
    refData: {},
    setRefData: () => {}
});


export function useAppData() {
    return useContext(AppProviderContext);
}

interface ChildrenProps {
    children?: ReactNode
}
export default function AppProvider({ children }: ChildrenProps) {
    const [user, setUser] = useState("");
    const [edit, setEdit] = useState({});
    const [refData, setRefData] = useState({});
    const [pipeIds, setPipeIds] = useState<string[]>([]);

    return (
        <AppProviderContext.Provider value={{ user, setUser, pipeIds, setPipeIds, edit, setEdit, refData, setRefData }}>
            {children}
        </AppProviderContext.Provider>
    )
}
