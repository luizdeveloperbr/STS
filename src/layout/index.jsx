import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
export default Layout