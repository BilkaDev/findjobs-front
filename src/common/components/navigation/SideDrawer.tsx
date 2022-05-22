import React, {useRef} from "react";
import ReactDOM from "react-dom";

import "./SideDrawer.css"

interface Props {
    children: React.ReactNode;
    open: boolean;
    setDrawer: (v: boolean) => void;
}

export const SideDrawer = (props: Props) => {
    const asideRef = useRef<HTMLHeadingElement>(null);


    function closeDrawer() {
        if (!!asideRef.current) {
            asideRef.current.classList.add('back')
        }
        setTimeout(() => props.setDrawer(false), 300)

    }

    const content = (
        <aside ref={asideRef} className={`SideDrawer active`} onClick={closeDrawer}>
            {props.children}
        </aside>)
    return ReactDOM.createPortal(content, document.getElementById('drawer-hook') as HTMLElement)
}