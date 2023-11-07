import React, { ReactNode, createContext, useContext, useState } from "react"

export interface AppProviderType {
    user: string
    setUser: React.Dispatch<React.SetStateAction<string>>
    pipeIds: string[]
    setPipeIds: React.Dispatch<React.SetStateAction<string[]>>
    edit: Record<string, any>,
    setEdit: React.Dispatch<React.SetStateAction<any>>
    refData: Record<string, NonNullable<unknown>>,
    setRefData: React.Dispatch<React.SetStateAction<NonNullable<unknown>>>
    appfiles: any[];
    setAppFiles: React.Dispatch<React.SetStateAction<any[]>>
}

export const AppProviderContext = createContext<AppProviderType>({
    user: "",
    setUser: () => { },
    pipeIds: [],
    setPipeIds: () => { },
    edit: {},
    setEdit: () => { },
    refData: {},
    setRefData: () => { },
    appfiles: [],
    setAppFiles: () => { }
});


export function useAppData() {
    return useContext(AppProviderContext);
}

interface ChildrenProps {
    children?: ReactNode
}
export default function AppProvider({ children }: ChildrenProps) {
    const [user, setUser] = useState("");
    const [edit, setEdit] = useState<any>({});
    const [refData, setRefData] = useState({});
    const [pipeIds, setPipeIds] = useState<string[]>([]);
    const [appfiles, setAppFiles] = useState<any[]>([]);

    return (
        <AppProviderContext.Provider value={{ user, setUser, pipeIds, setPipeIds, edit, setEdit, refData, setRefData, appfiles, setAppFiles }}>
            {children}
        </AppProviderContext.Provider>
    )
}
