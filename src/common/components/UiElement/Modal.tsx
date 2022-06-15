import React, {CSSProperties} from 'react';
import ReactDOM from 'react-dom';

import './Modal.css'

interface PropsModalOverlay {
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
    header: string;
    footerClass?: string;
    contentClass?: string;
    footer: JSX.Element;
    headerClass?: string;

}

export const Modal = (props: PropsModalOverlay) => {
    const content = (
        <div className={`Modal ${props.className}`} style={props.style}>
            <header className={`Modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>

            <div className={`Modal__content ${props.contentClass}`}>
                {props.children}
            </div>
            <footer className={`Modal__footer ${props.footerClass}`}>
                {props.footer}
            </footer>
        </div>
    )
    return ReactDOM.createPortal(content, document.getElementById('modal-hook') as HTMLElement)
}


