import React, {FormEvent, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Card} from "../../common/components/UiElement/Card";
import {Button} from "../../common/components/FormElements/Buttons";
import {Input} from "../../common/components/FormElements/Input";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MAXLENGTH, VALIDATOR_MIN,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from "../../common/utils/validators";
import {AdEntity} from 'types'
import {useForm} from "../../common/hooks/form-hook";


const DUMMY_ADS = [
    {
        id: 'adsid1',
        email: "example@example.com",
        name: 'Firma',
        image: 'https://cdn.pixabay.com/photo/2021/08/11/18/06/paladin-6539115_960_720.png',
        title: 'Junior Javascript, React',
        address: 'Katowice, mariacka 4',
        salaryMin: 2000,
        salaryMax: 3000,
        technology: 'JS,React',
        lat: 52.0932937,
        lon: 14.3430061,
        creatorId: 'userId',
        description: "lorem ipsum dolor sit amet, consectetur adip",

    },
    {
        id: 'adsid2',
        email: "example@example.com",
        name: 'Firma 1',
        image: 'https://cdn.pixabay.com/photo/2021/08/11/18/06/paladin-6539115_960_720.png',
        title: 'Junior Javascript, React',
        address: 'Katowice, mariacka 4',
        salaryMin: 2000,
        salaryMax: 3000,
        technology: 'JS,React',
        lat: 52.3862034,
        lon: 18.6043395,
        creatorId: 'userId',
        description: "lorem ipsum dolor sit amet, consectetur adip",


    },
]


export const UpdateAd = () => {
    const [isLoading, setIsLoading,] = useState(true);
    const {adId} = useParams();



    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: "",
            isValid: false
        },
        address: {
            value: "",
            isValid: false
        },
        name: {
            value: "",
            isValid: false
        },
        description: {
            value: "",
            isValid: false,
        },
        email: {
            value: "",
            isValid: false,
        },
        "price-min": {
            value: "",
            isValid: false
        },
        "price-max": {
            value: "",
            isValid: false
        },
        technology: {
            value: "",
            isValid: false
        },
    }, false)

    const identifiedAd = DUMMY_ADS.filter(ad => ad.id === adId)[0] as AdEntity;

    useEffect(() => {
        setFormData({
            title: {
                value: identifiedAd.title,
                isValid: true
            },
            address: {
                value: identifiedAd.address,
                isValid: true
            },
            name: {
                value: identifiedAd.name,
                isValid: true
            },
            description: {
                value: identifiedAd.description,
                isValid: true,
            },
            email: {
                value: identifiedAd.email,
                isValid: true,
            },
            "price-min": {
                value: identifiedAd.salaryMin,
                isValid: true
            },
            "price-max": {
                value: identifiedAd.salaryMax,
                isValid: true
            },
            technology: {
                value: identifiedAd.technology,
                isValid: true
            },
        }, true)
        setIsLoading(false)

    }, [setFormData, identifiedAd])

    function adUpdateSubmitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(formState)
    }

    if (!identifiedAd) {
        return <div className="center" style={{margin: "2rem"}}><Card style={{padding: "1rem"}}><h2>Could not find
            ad</h2></Card></div>
    }

    if (isLoading) {
        return <div className="center" style={{margin: "2rem"}}><Card style={{padding: "1rem"}}><h2>Loading...</h2></Card></div>
    }




    return (
        <form onSubmit={adUpdateSubmitHandler} className="NewAds__form">
            <Input label="Company Name:"
                   id="name"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Please enter company name"
                   validators={[VALIDATOR_REQUIRE()]}
                   onInput={inputHandler}
                   initialValue={formState.inputs.name.value}
                   initialValid={true}
            />
            <Input label="Address:"
                   id="address"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Please enter a valid address"
                   validators={[VALIDATOR_REQUIRE()]}
                   onInput={inputHandler}
                   initialValue={formState.inputs.address.value}
                   initialValid={true}

            />
            <Input label="Title:"
                   id="title"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Please enter a valid title.(title must be between 3 and 30 characters)"
                   validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(30)]}
                   initialValue={formState.inputs.title.value}
                   initialValid={true}
                   onInput={inputHandler}

            />
            <Input label="E-mail:"
                   id="email"
                   element="input"
                   placeholder=""
                   type="email"
                   errorText="Please enter a valid e-mail."
                   validators={[VALIDATOR_EMAIL()]}
                   initialValue={formState.inputs.email.value}
                   initialValid={true}
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
                   initialValue={formState.inputs["price-min"].value}
                   initialValid={true}
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
                   initialValue={formState.inputs["price-max"].value}
                   initialValid={true}
                   onInput={inputHandler}

            />
            <Input label="Technology:"
                   id="technology"
                   element="input"
                   placeholder=""
                   type="text"
                   errorText="Technology is required."
                   validators={[VALIDATOR_REQUIRE()]}
                   initialValue={formState.inputs.technology.value}
                   initialValid={true}
                   onInput={inputHandler}

            />
            <Input label="Description:"
                   id="description"
                   element="textarea"
                   placeholder=""
                   type="text"
                   errorText="Description is required."
                   validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(1000)]}
                   initialValue={formState.inputs.description.value}
                   initialValid={true}
                   onInput={inputHandler}

            />
            <Button type="submit" disabled={!formState.isValid}>Edit Ad</Button>
        </form>
    )
}