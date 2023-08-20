import React, {useReducer, createContext} from "react";
import Header from "./Header";
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom";
import listRouters from "../routers"
import logo from "../style/icons/logo.png"

export const layout = createContext()

const INITIAL_STATES = {sidebarOpen: false, sidebarExpanded: false, userMenu: false}

function handlerLayoutChange(state, action){

    let newValue = Object.defineProperty(
        state,
        action.toggle,
        { value: !state[action.toggle] }
    )

    return {...newValue}
}

function LayoutContext() {

    const [layoutState, setLayoutState] = useReducer(handlerLayoutChange, INITIAL_STATES)

    return (
        <layout.Provider value={{layoutState, setLayoutState}}>
            <div className="flex h-screen overflow-hidden">
                <Sidebar.Wrapper>               
                    <Sidebar.Header logo={logo} />
                    <Sidebar.MenuList links={listRouters} />
                    <Sidebar.ExpandButton />
                </Sidebar.Wrapper>
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </layout.Provider>
    )
}
export default LayoutContext