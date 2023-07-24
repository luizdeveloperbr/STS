import React, { createContext, useContext, useReducer } from "react";

const LayoutContext = createContext()

function handlerLayoutChange(state, action){

    let newValue = Object.defineProperty(
        state,
        action.toggle,
        { value: !state[action.toggle] }
    )

    return {...newValue}
}

export function LayoutProvider({children}) {

    const [layoutState, setLayoutState] = useReducer(handlerLayoutChange,{sidebarOpen: false, sidebarExpanded: false, userMenu: false})
    
    return (
        < LayoutContext.Provider value={{layoutState, setLayoutState}}>
            {children}
        </LayoutContext.Provider >
    )
}

export function useLayoutContext(){
    return useContext(LayoutContext)
}