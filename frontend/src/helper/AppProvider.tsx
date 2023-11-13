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
  darkMode: false,
  setDarkMode: () => { },
});


export function useAppData() {
  return useContext(AppProviderContext);
}


export default function AppProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState("");
  const [edit, setEdit] = useState<any>({});
  const [refData, setRefData] = useState({});
  const [pipeIds, setPipeIds] = useState<string[]>([]);
  const [appFiles, setAppFiles] = useState<(File | string)[]>([])
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppProviderContext.Provider value={{ user, setUser, pipeIds, setPipeIds, edit, setEdit, refData, setRefData, appFiles, setAppFiles, darkMode, setDarkMode }}>
      {children}
    </AppProviderContext.Provider>
  )
}
