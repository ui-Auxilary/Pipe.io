import React, { createContext, useContext, useState } from "react"

export interface UserType {
    user: string
    setUser: React.Dispatch<React.SetStateAction<string>>
}

export const AppProviderContext = createContext<UserType>({
    user: "",
    setUser: () => { }
});


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
