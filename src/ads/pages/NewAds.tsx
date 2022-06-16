import React, {FormEvent, useContext, useState} from 'react';
import {Input} from "../../common/components/FormElements/Input";
import {Button} from "../../common/components/FormElements/Buttons";
import {
    VALIDATOR_EMAIL, VALIDATOR_MAX,
    VALIDATOR_MAXLENGTH,
    VALIDATOR_MIN,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from "../../common/utils/validators";
import {useForm} from "../../common/hooks/form-hook";
import {useHttpClient} from "../../common/hooks/http-hook";
import {AdEntity} from '../../../../findjobs-back/types/ad-entity';
import {ErrorModal} from "../../common/components/UiElement/ErrorModal";
import {LoadingSpinner} from "../../common/components/UiElement/LoadingSpinner";
import {Card} from "../../common/components/UiElement/Card";
import {geocode} from "../../common/utils/geocoding";
import {AuthContext} from "../../common/context/AuthContext";
import './NewAds.css';

export const NewAds = () => {

    const {sendRequest, isLoading, error, setError} = useHttpClient();
    const [resultInfo, setResultInfo] = useState<string | null>(null);
    const auth = useContext(AuthContext);

    const [formState, inputHandler] = useForm({
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
    }, false);

    const adsSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const geoRes = await geocode(formState.inputs.address.value);
        if (!geoRes.resStatus) {
            setError(geoRes.resMessage);
        } else {
            const {lat, lon} = geoRes;
            const newAd: Omit<AdEntity, 'id'> = {
                name: formState.inputs.name.value,
                title: formState.inputs.title.value,
                address: formState.inputs.address.value,
                creatorId: auth.userId as string,
                description: formState.inputs.description.value,
                email: formState.inputs.email.value,
                salaryMin: Number(formState.inputs["price-min"].value),
                salaryMax: Number(formState.inputs["price-max"].value),
                technology: formState.inputs.technology.value,
                //@todo change image url!
                image: "https://cdn.pixabay.com/photo/2016/12/21/15/48/bitcoin-1923206_960_720.png",
                lat,
                lon,

            };

            const res = await sendRequest(
                '/job',
                'POST',
                newAd,
                {
                    'Content-Type': 'application/json'
                }
            );
            setResultInfo(`${res.newAd.name} added with ID ${res.newAd.id}.`);
        }
    };

    if (resultInfo !== null) {
        return (
            <div className="center margin">
                <Card className="result-info">
                    <p>{resultInfo}</p>
                    <Button onClick={() => setResultInfo(null)}>Add another one</Button>
                </Card>
            </div>);
    }
    return (<>
        {error && <ErrorModal error={error} onClick={() => setError(null)}/>}
        {isLoading && <LoadingSpinner asOverlay/>}
        <form onSubmit={adsSubmitHandler} className="NewAds__form">
            <Input label="Company Name:"
                   id="name"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Please enter company name"
                   validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
                   onInput={inputHandler}
            />
            <Input label="Address:"
                   id="address"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Please enter a valid address"
                   validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(100)]}
                   onInput={inputHandler}
            />
            <Input label="Title:"
                   id="title"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Please enter a valid title.(title must be between 3 and 30 characters)"
                   validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(50)]}
                   onInput={inputHandler}
            />
            <Input label="E-mail:"
                   id="email"
                   element="input"
                   placeholder=""
                   type="email"
                   errorText="Please enter a valid e-mail."
                   validators={[VALIDATOR_EMAIL(), VALIDATOR_MAXLENGTH(100)]}
                   onInput={inputHandler}
            />
            <Input label="price min:"
                   id="price-min"
                   element="input"
                   placeholder=""
                   type="number"
                   min="0"
                   errorText="Price is required."
                   validators={[VALIDATOR_MIN(0), VALIDATOR_REQUIRE(), VALIDATOR_MAX(9999999)]}
                   onInput={inputHandler}
            />
            <Input label="price max:"
                   id="price-max"
                   element="input"
                   placeholder=""
                   type="number"
                   min="0"
                   errorText="Price is required."
                   validators={[VALIDATOR_MIN(0), VALIDATOR_REQUIRE(), VALIDATOR_MAX(9999999)]}
                   onInput={inputHandler}
            />
            <Input label="Technology:"
                   id="technology"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Technology is required."
                   validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(100)]}
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
        </form>
    </>);
};