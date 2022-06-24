import { createContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    return (
        <UserContext.Provider value={{ userData: JSON.parse(localStorage.getItem("user")) }}>{children}</UserContext.Provider>
    );
}

export default UserContext;