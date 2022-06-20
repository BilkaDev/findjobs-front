import React from 'react';
import {Link} from 'react-router-dom';

import './Button.css';

interface Props {
    className?: string;
    href?: string;
    size?: number;
    inverse?: boolean;
    danger?: boolean;
    children: React.ReactNode;
    to?: string;
    onClick?: ()=> void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset" | undefined;

}


export const Button = (props: Props) => {
    if (props.href) {
        return (
            <a
                className={`button button--${props.size || 'default'} ${props.inverse &&
                'button--inverse'} ${props.danger && 'button--danger'}`}
                href={props.href}
            >
                {props.children}
            </a>
        );
    }
    if (props.to) {
        return (
            <Link
                to={props.to}
                className={`button button--${props.size || 'default'} ${props.inverse &&
                'button--inverse'} ${props.danger && 'button--danger'}`}
            >
                {props.children}
            </Link>
        );
    }
    return (
        <button
            className={`button button--${props.size || 'default'} ${props.inverse &&
            'button--inverse'} ${props.danger && 'button--danger'} ${props.className && props.className}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

