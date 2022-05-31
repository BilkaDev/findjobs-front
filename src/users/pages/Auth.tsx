import {useNavigate} from "react-router-dom";
import {FormEvent, useContext, useState} from "react";
import {useForm} from "../../common/hooks/form-hook";
import {Card} from "../../common/components/UiElement/Card";
import {Input} from "../../common/components/FormElements/Input";
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../common/utils/validators";
import {Button} from "../../common/components/FormElements/Buttons";
import {AuthContext} from "../../common/context/AuthContext";
import './Auth.css'

export const Auth = () => {
    const auth = useContext(AuthContext);


    const [isLoginMode, setIsLoginMode] = useState(true)

    const [formState, inputHandler, setFormDate] = useForm({
        email: {
            value: "",
            isValid: false,
        },
        password: {
            value: "",
            isValid: false,
        }
    }, false)
    const nav = useNavigate();


    const authSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


    }
    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormDate({
                ...formState.inputs,
                name: undefined,
                image: undefined,
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormDate({
                ...formState.inputs,
                name: {
                    value: "",
                    isValid: false
                },
                image: {
                    value: null,
                    isValid: false,
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    return (
        <>
            {/*<ErrorModal error={error} onClear={clearError}/>*/}
            <Card className="Auth">
                <h2>Login Required</h2>
                <hr/>
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && <
                        Input
                        element="input"
                        placeholder=""
                        id="name"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name"
                        onInput={inputHandler}

                    />}
                    <Input
                        id="email"
                        placeholder=""
                        element="input"
                        type="email"
                        label="Email"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address"
                        onInput={inputHandler}
                    />
                    <Input
                        id="password"
                        placeholder=""
                        element="input"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Please enter a valid password (at least 5 characters)"
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
                </form>
                <Button inverse
                        onClick={switchModeHandler}>{isLoginMode ? 'SWITCH TO SIGNUP' : 'SWITCH TO LOGIN'}</Button>

            </Card>
        </>
    )

}