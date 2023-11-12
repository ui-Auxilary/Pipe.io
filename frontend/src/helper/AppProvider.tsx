import { createContext, useContext, useState } from "react"
import { AppProviderType, ChildrenProps } from "types/HelperTypes"

export const AppProviderContext = createContext<AppProviderType>({
    user: "",
    setUser: () => { },
    pipeIds: [],
    setPipeIds: () => { },
    edit: {},
    setEdit: () => { },
    refData: {},
    setRefData: () => { },
    appFiles: [],
    setAppFiles: () => { },
});


export function useAppData() {
    return useContext(AppProviderContext);
}


export default function AppProvider({ children }: ChildrenProps) {
    const [user, setUser] = useState("");
    const [edit, setEdit] = useState<any>({});
    const [refData, setRefData] = useState({});
    const [pipeIds, setPipeIds] = useState<string[]>([]);
    const [appFiles, setAppFiles] = useState<File[]>([])

    return (
        <AppProviderContext.Provider value={{ user, setUser, pipeIds, setPipeIds, edit, setEdit, refData, setRefData, appFiles, setAppFiles }}>
            {children}
        </AppProviderContext.Provider>
    )
}
