import { createContext, useContext, useEffect, useState } from "react"
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
  prevFiles: [],
  setPrevFiles: () => { },
  darkMode: false,
  setDarkMode: () => { },
});


export function useAppData() {
  return useContext(AppProviderContext);
}


export default function AppProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState("");
  const [edit, setEdit] = useState<Record<number, object>>({});
  const [refData, setRefData] = useState({});
  const [pipeIds, setPipeIds] = useState<string[]>([]);
  const [appFiles, setAppFiles] = useState<(File)[]>([]);
  const [prevFiles, setPrevFiles] = useState<(string)[]>([]);
  const storedDarkMode = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState(JSON.parse(storedDarkMode || 'false') || false);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode)
  }, [darkMode])

  return (
    <AppProviderContext.Provider value={{ user, setUser, pipeIds, setPipeIds, edit, setEdit, refData, setRefData, appFiles, setAppFiles, prevFiles, setPrevFiles, darkMode, setDarkMode }}>
      {children}
    </AppProviderContext.Provider>
  )
}
