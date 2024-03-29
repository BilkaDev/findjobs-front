import React, {ChangeEvent, useEffect, useReducer} from 'react';
import {validate, Validator} from "../../utils/validators";
import "./Input.css";

interface Props {
    initialValue?: string | number;
    initialValid?: boolean;
    label: string;
    id: string;
    element: string;
    type: string;
    placeholder: string;
    rows?: number;
    required?: boolean;
    errorText?: string;
    validators: Validator[];
    min?: string;
    onInput: (id: string, value: string, isValid: boolean) => void;
}

const InputReducer = (state: any, action: any) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators),
            };
        case "TOUCH":
            return {...state, isTouch: true};
        default:
            return state;
    }
};


export const Input = (props: Props) => {
    const [inputState, dispatch] = useReducer(InputReducer, {
        value: props.initialValue || '',
        isValid: props.initialValid || false,
        isTouch: false
    });

    const {id, onInput} = props;
    const {value, isValid, isTouch} = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid]);

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch({
            type: 'CHANGE',
            value: e.target.value,
            validators: props.validators,
        });
    };
    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };
    const element = props.element === 'input' ? (
        <input
            type={props.type}
            placeholder={props.placeholder}
            required={props.required}
            min={props.min}
            onChange={(e) => changeHandler(e)}
            value={value}
            onBlur={touchHandler}
        />) : (
        <textarea
            rows={props.rows || 3}
            onChange={(e) => changeHandler(e)}
            value={value}
            onBlur={touchHandler}
        />);


    return (
        <label className="Input__label">
            <p>{props.label}</p>
            {element}
            {!isValid && isTouch && <p className="Input__error-text">{props.errorText}</p>}
        </label>
    );
};