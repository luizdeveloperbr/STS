import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom";
import { LayoutProvider } from '../contexts/useLayoutContext'

const Layout = ({ routers }) => {
    return (
        <LayoutProvider>
            <div className="flex h-screen overflow-hidden">
                <Sidebar.Wrapper>               
                {/* <Sidebar.Logo icon={null}/> */}
                <Sidebar.MenuList links={routers} />
                {/* <Sidebar.ExpandButton /> */}
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