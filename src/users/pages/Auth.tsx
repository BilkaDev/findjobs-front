import {useNavigate} from "react-router-dom";
import {FormEvent, useContext, useState} from "react";
import {useForm} from "../../common/hooks/form-hook";
import {Card} from "../../common/components/UiElement/Card";
import {Input} from "../../common/components/FormElements/Input";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MAXLENGTH,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from "../../common/utils/validators";
import {Button} from "../../common/components/FormElements/Buttons";
import {AuthContext} from "../../common/context/AuthContext";
import {useHttpClient} from "../../common/hooks/http-hook";
import {ErrorModal} from "../../common/components/UiElement/ErrorModal";
import {LoadingSpinner} from "../../common/components/UiElement/LoadingSpinner";
import './Auth.css';


export const Auth = () => {
    const auth = useContext(AuthContext);
    const {sendRequest, isLoading, error, setError} = useHttpClient();


    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler, setFormDate] = useForm({
        email: {
            value: "",
            isValid: false,
        },
        password: {
            value: "",
            isValid: false,
        }
    }, false);
    const nav = useNavigate();


    const authSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoginMode) {
            const res = await sendRequest(
                '/user/login',
                'POST',
                {
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                },
                {
                    'Content-Type': 'application/json'
                }
            );
            auth.setUserId(res.id)


        } else {
            const res = await sendRequest(
                '/user/singup',
                'POST',
                {
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                },
                {
                    'Content-Type': 'application/json'
                }
            );
            auth.setUserId(res.user.id)
        }
        auth.login();
        nav('/');
    };
    const switchModeHandler = () => {
        if (!isLoginMode) {

            setFormDate({
                ...formState.inputs,
                name: undefined,
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormDate({
                ...formState.inputs,
                name: {
                    value: "",
                    isValid: false
                }
            }, false);
        }
        console.log(formState.inputs.email.isValid && formState.inputs.password.isValid);
        setIsLoginMode(prevMode => !prevMode);
    };

    return (
        <>
            {error && <ErrorModal error={error} onClick={() => setError(null)}/>}
            <Card className="Auth">
                {isLoading && <LoadingSpinner asOverlay/>}
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
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
                        errorText="Please enter a name"
                        onInput={inputHandler}

                    />}
                    <Input
                        id="email"
                        placeholder=""
                        element="input"
                        type="email"
                        label="Email"
                        validators={[VALIDATOR_EMAIL(), VALIDATOR_MAXLENGTH(100)]}
                        errorText="Please enter a valid email address"
                        onInput={inputHandler}
                    />
                    <Input
                        id="password"
                        placeholder=""
                        element="input"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_MAXLENGTH(25)]}
                        errorText="Please enter a valid password (at least 6 characters and max 25.)"
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
                </form>
                <Button inverse
                        onClick={switchModeHandler}>{isLoginMode ? 'SWITCH TO SIGNUP' : 'SWITCH TO LOGIN'}</Button>

            </Card>
        </>
    );

};