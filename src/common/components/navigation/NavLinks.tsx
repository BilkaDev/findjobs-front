import React from "react";

import {NavLink} from "react-router-dom";

import './NavLinks.css'

interface Props {

}

export const NavLinks = (props: Props) => {

    return (
        <ul className="NavLinks">
            <li>
                <NavLink to="/">Find jobs</NavLink>
            </li>
            <li>
                <NavLink to="/userId/ads">My ads</NavLink>
            </li>
            <li>
                <NavLink to="/new">Add ad</NavLink>
            </li>
            <li>
                <NavLink to="/auth">Authenticate</NavLink>
            </li>
        </ul>
    )
}