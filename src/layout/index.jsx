import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <React.Fragment>
            <header>nav</header>
            <main>
                <Outlet />
            </main>
            <footer>copyright</footer>
        </React.Fragment>
    )
}
export default Layout