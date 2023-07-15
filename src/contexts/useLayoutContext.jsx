import React, { createContext, useContext, useReducer } from "react";

const LayoutContext = createContext()

function handlerLayoutChange(state,action){
switch (action.toggle){
    case "sidebarOpened": {
        return {
            ...state,
            sidebarOpened: !state.sidebarOpened
        }
    };
    case "sidebarExpanded": {
        return {
            ...state,
            sidebarExpanded: !state.sidebarExpanded
        }
    };
    case "userMenu": {
        return {
            ...state,
            userMenu: !state.userMenu
        }
    };

}
} 

export function LayoutProvider({children}) {

    const [layoutState, setLayoutState] = useReducer(handlerLayoutChange,{sidebarOpened: false, sidebarExpanded: false, userMenu: false})
    
    return (
        < LayoutContext.Provider value={{layoutState, setLayoutState}}>
            {children}
        </LayoutContext.Provider >
    )
}

export function useLayoutContext(){
    return useContext(LayoutContext)
}