import React, {useState} from "react";


import {MainHeader} from "./MainHeader";
import {Link} from "react-router-dom";
import {NavLinks} from "./NavLinks";
import {SideDrawer} from "./SideDrawer";
import './MainNavigation.css'


export const MainNavigation = () => {
    const [drawerIsOpen, setDrawerIsOpen,] = useState(false);

    return (
        <>
            {drawerIsOpen && <SideDrawer open={drawerIsOpen} setDrawer={setDrawerIsOpen}>
                <nav className="MainNavigation__drawer-nav">
                    <NavLinks/>
                </nav>
            </SideDrawer>}
            <MainHeader>
                <h1 className="MainNavigation__title">
                    <Link to="/">FindJobs</Link>
                </h1>
                <button onClick={() => setDrawerIsOpen(true)} className="MainNavigation__menu-btn">
                    <span/>
                    <span/>
                    <span/>
                </button>
                <nav className="MainNavigation__desktop">
                    <NavLinks/>
                </nav>
            </MainHeader>
        </>
    )
}