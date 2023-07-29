import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom";
import { LayoutProvider } from '../contexts/useLayoutContext'
import listRouters from "../routers"
import logo from "../style/icons/logo.png"

const Layout = () => {
    return (
        <LayoutProvider>
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
        </LayoutProvider>
    )
}
export default Layout