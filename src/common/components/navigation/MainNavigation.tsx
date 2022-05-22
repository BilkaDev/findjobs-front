import React from "react";


import {MainHeader} from "./MainHeader";
import './MainNavigation.css'
import {Link} from "react-router-dom";
import {NavLinks} from "./NavLinks";




export const MainNavigation = () => {

    return (
        <MainHeader>
            <h1 className="MainNavigation__title">
                <Link to="/">FindJobs</Link>
            </h1>
            <button className="MainNavigation__menu-btn">
                <span/>
                <span/>
                <span/>
            </button>
            <nav className="MainNavigation__desktop">
                <NavLinks/>
            </nav>
        </MainHeader>
    )
}