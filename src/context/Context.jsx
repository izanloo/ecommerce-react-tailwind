import {createContext,useState } from "react";
export const AppContext = createContext({});
 
export function Context({children}){
    let example="test"
    // const [nameState,setNameState] = useState({})
    return(
        <AppContext.Provider value={{example}}>
            {children}
        </AppContext.Provider>
    )
}

// use context in aonther component:
// const {namestate,setNameState} = useContext(AppContext)
