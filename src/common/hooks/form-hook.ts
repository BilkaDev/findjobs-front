import {useCallback, useReducer} from "react";
import {Simulate} from "react-dom/test-utils";


const formReducer = (state: any, action: any) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            }
        case "SET_DATA":
            return {
                inputs: action.inputs,
                isValid: action.formisValid,
            }
        default:
            return state;

    }
};

export const useForm = (initialInputs:any,initialFormValidity : boolean) => {
    const inputHandler = useCallback((id: string, value: string, isValid: boolean) => {
        dispatch({type: 'INPUT_CHANGE',value,isValid,inputId: id})
    }, [])

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity,
    })

    const setFormData = useCallback((inputData:any, formValidity:boolean) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity,
        })
    },[])
    return [formState, inputHandler, setFormData]

}