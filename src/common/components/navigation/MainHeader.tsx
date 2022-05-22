import React from "react";

import './MainHeader.css'


interface Props {
    children: React.ReactNode;

}

export const MainHeader = (props: Props)=> {

    return(
        <header className="MainHeader">
            {props.children}
        </header>
    )
}