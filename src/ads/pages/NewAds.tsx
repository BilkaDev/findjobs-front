import React, {FormEvent} from 'react';
import {Input} from "../../common/components/FormElements/Input";

import './NewAds.css'
import {Button} from "../../common/components/FormElements/Buttons";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MAXLENGTH,
    VALIDATOR_MIN,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from "../../common/utils/validators";
import {useForm} from "../../common/hooks/form-hook";





export const NewAds = () => {

    const [formState,inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        name: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false,
        },
        email: {
            value: '',
            isValid: false,
        },
        "price-min": {
            value: '',
            isValid: false
        },
        "price-max": {
            value: '',
            isValid: false
        },
        technology: {
            value: '',
            isValid: false
        },
    },false)



    const adsSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    return (
        <form onSubmit={adsSubmitHandler} className="NewAds__form">
            <Input label="Company Name:"
                   id="name"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Please enter company name"
                   validators={[VALIDATOR_REQUIRE()]}
                   onInput={inputHandler}
            />
            <Input label="Address:"
                   id="address"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Please enter a valid address"
                   validators={[VALIDATOR_REQUIRE()]}
                   onInput={inputHandler}
            />
            <Input label="Title:"
                   id="title"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Please enter a valid title.(title must be between 3 and 30 characters)"
                   validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(30)]}
                   onInput={inputHandler}
            />
            <Input label="E-mail:"
                   id="email"
                   element="input"
                   placeholder=""
                   type="email"
                   errorText="Please enter a valid e-mail."
                   validators={[VALIDATOR_EMAIL()]}
                   onInput={inputHandler}
            />
            <Input label="price min:"
                   id="price-min"
                   element="input"
                   placeholder=""
                   type="number"
                   min="0"
                   errorText="Price is required."
                   validators={[VALIDATOR_MIN(0), VALIDATOR_REQUIRE()]}
                   onInput={inputHandler}
            />
            <Input label="price max:"
                   id="price-max"
                   element="input"
                   placeholder=""
                   type="number"
                   min="0"
                   errorText="Price is required."
                   validators={[VALIDATOR_MIN(0), VALIDATOR_REQUIRE()]}
                   onInput={inputHandler}
            />
            <Input label="Technology:"
                   id="technology"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Technology is required."
                   validators={[VALIDATOR_REQUIRE()]}
                   onInput={inputHandler}
            />
            <Input label="Description:"
                   id="description"
                   element="textarea"
                   placeholder=""
                   type="text"
                   errorText="Description is required."
                   validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(1000)]}
                   onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>ADD AD</Button>
        </form>)
}