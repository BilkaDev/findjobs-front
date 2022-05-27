import React from 'react';
import {Input} from "../../common/components/UiElement/Input";

import './NewAds.css'
import {Button} from "../../common/components/FormElements/Buttons";
import {
        VALIDATOR_EMAIL,
        VALIDATOR_MAXLENGTH,
        VALIDATOR_MIN,
        VALIDATOR_MINLENGTH,
        VALIDATOR_REQUIRE
} from "../../common/utils/validators";


export const NewAds = () => {

    return (
        <form className="NewAds__form">
            <Input label="Company Name:"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Please enter company name"
                   validators={[VALIDATOR_REQUIRE()]}
            />
            <Input label="Title:"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Please enter a valid title.(title must be a)"
                   validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3),VALIDATOR_MAXLENGTH(30)]}

            />
            <Input label="E-mail:"
                   element="input"
                   placeholder=""
                   type="email"
                   errorText="Please enter a valid e-mail."
                   validators={[VALIDATOR_EMAIL()]}

            />
            <Input label="price min:"
                   element="input"
                   placeholder=""
                   type="number"
                   min="0"
                   errorText="Price is required."
                   validators={[VALIDATOR_MIN(0),VALIDATOR_REQUIRE()]}


            />
            <Input label="price max:"
                   element="input"
                   placeholder=""
                   type="number"
                   min="0"
                   errorText="Price is required."
                   validators={[VALIDATOR_MIN(0),VALIDATOR_REQUIRE()]}


            />
            <Input label="Technology:"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Technology is required."
                   validators={[VALIDATOR_REQUIRE()]}


            />
            <Input label="Description:"
                   element="textarea"
                   placeholder=""
                   type="text"
                   errorText="Description is required."
                   validators={[VALIDATOR_REQUIRE(),VALIDATOR_MAXLENGTH(1000)]}

            />
            <Button>Send</Button>
        </form>)
}