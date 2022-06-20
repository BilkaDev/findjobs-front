import './LogoImage.css'
import React from "react";


interface Props {
    image: string;
    name: string;
}

export const LogoImage = (props: Props)=> {

    return(
        <div className="LogoImage">
            <img src={props.image} alt={`logo ${props.name} company`} />
        </div>
    )
}