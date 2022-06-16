import React, {useContext} from "react";

import {NavLink} from "react-router-dom";

import './NavLinks.css'
import {AuthContext} from "../../context/AuthContext";
import {Button} from "../FormElements/Buttons";


export const NavLinks = () => {
    const auth = useContext(AuthContext)

    return (
        <ul className="NavLinks">
            <li>
                <NavLink to="/">Find jobs</NavLink>
            </li>
            {auth.isLoggedIn && <li>
                <NavLink to={`/${auth.userId}/ads`}>My ads</NavLink>
            </li>}
            {auth.isLoggedIn && <li>
                <NavLink to="/new">Add ad</NavLink>
            </li>}
            <li>
                {!auth.isLoggedIn ?
                    <NavLink to="/auth">Authenticate</NavLink> :
                    <Button inverse onClick={auth.logout}>Logout</Button>}
            </li>
        </ul>
    )
}