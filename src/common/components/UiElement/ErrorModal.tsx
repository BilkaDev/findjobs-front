import React from "react";
import {Modal} from "./Modal";
import {Button} from "../FormElements/Buttons";

interface Props {
    error: string;
    onClick: ()=> void;
    className?: string
}

export const ErrorModal = (props : Props) => {
    return (
        <Modal
            className={`ErrorModal ${props.className}`}
            header="An Error Occurred!"
            footer={<Button onClick={props.onClick}>Okay</Button>}
        >
            <p>{props.error}</p>
        </Modal>
    );
};
