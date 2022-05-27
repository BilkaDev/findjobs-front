import React, {ChangeEvent, useReducer} from 'react';

import "./Input.css"
import {validate, Validator} from "../../utils/validators";

interface Props {
    label: string;
    element: string;
    type: string;
    placeholder: string;
    rows?: number;
    required?: boolean;
    errorText?: string;
    validators: Validator[];
    min?: string;
}

const InputReducer = (state: any, action: any) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators),
            }
        case "TOUCH":
            return {...state,isTouch: true}
        default:
            return state;
    }
}


export const Input = (props: Props) => {
    const [inputState, dispatch] = useReducer(InputReducer, {value: '', isValid: false, isTouch: false})

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch({
            type: 'CHANGE',
            value: e.target.value,
            validators: props.validators,
        })
    }
    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    }
    const element = props.element === 'input' ? (
        <input
            {...props}
            onChange={(e) => changeHandler(e)}
            value={inputState.value}
            onBlur={touchHandler}
        />) : (
        <textarea
            rows={props.rows || 3}
            onChange={(e) => changeHandler(e)}
            value={inputState.value}
            onBlur={touchHandler}
        />);


    return (
        <label className="Input__label">
            {props.label}
            {element}
            {!inputState.isValid && inputState.isTouch &&<p className="Input__error-text">{props.errorText}</p>}
        </label>
    )
}