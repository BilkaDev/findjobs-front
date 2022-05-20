import React, {CSSProperties} from "react";

import './Card.css'


interface Props {
    children: React.ReactNode;
    className?: string | undefined;
    style?: CSSProperties | undefined;
}

export const Card = (props: Props)=> {

    return(
        <div style={props.style} className={`Card ${props.className}`}>
            {props.children}
        </div>
    )
}