import { createContext, useContext, useState } from "react"

export const AppProviderContext = createContext({});

export function useAppData() {
    return useContext(AppProviderContext);
}

export default function AppProvider({ children }) {
    const [user, setUser] = useState("");

    return (
        <AppProviderContext.Provider value={{ user, setUser }}>
            {children}
        </AppProviderContext.Provider>
    )
}
