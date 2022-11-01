import {createContext } from "react";
export const AppContext = createContext();
 
export function Context({children}){
    const user ="bb"

    return(
        <AppContext.Provider value={{user}}>
            {children}
        </AppContext.Provider>
    )
}