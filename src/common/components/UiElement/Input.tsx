import React, {ChangeEvent,  useReducer} from 'react';

import "./Input.css"

interface Props {
    label: string;
    element: string;
    type: string;
    placeholder: string;
    rows?: number;
    required?: boolean;
    min?: string;
    errorText?:string


}

const InputReducer = (state: any, action: any) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.value,
                isValid: true,
            }
        default:
            return state;
    }
}


export const Input = (props: Props) => {
    const [inputState, dispatch] = useReducer(InputReducer, {value: '', isValid: false})

    const changeHandler = (e: ChangeEvent<HTMLInputElement>
    ) => {
        dispatch({type: 'CHANGE', value: e.target.value})
    }
    const element = props.element === 'input' ? (
        <input
            {...props}
            onChange={(e) => changeHandler(e)}
            value={inputState.value}
        />) : (
        <textarea
            rows={props.rows || 3}
            onChange={() => changeHandler}
            value={inputState.value}

        />);


    return (
        <label className="Input__label">
            {props.label}
            {element}
            {!inputState.isValid && <p className="Input__error-text">{props.errorText}</p>}
        </label>
    )
}