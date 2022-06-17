import React, {FormEvent, useContext, useEffect, useState} from 'react';
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
import {AdEntity} from 'types';
import {useForm} from "../../common/hooks/form-hook";
import {useHttpClient} from "../../common/hooks/http-hook";
import {ErrorModal} from "../../common/components/UiElement/ErrorModal";
import {LoadingSpinner} from "../../common/components/UiElement/LoadingSpinner";
import {geocode} from "../../common/utils/geocoding";
import {AuthContext} from "../../common/context/AuthContext";

export const UpdateAd = () => {
    const [loadedAd, setLoadedAd] = useState<AdEntity>();
    const {isLoading, error, sendRequest, clearError, setError} = useHttpClient();
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
    }, false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);
    const {adId} = useParams();
    const auth = useContext(AuthContext);


    useEffect(() => {
        (async () => {
            const loadedAd = await sendRequest(`/job/${adId}`);
            setFormData({
                title: {
                    value: loadedAd.ad.title,
                    isValid: true
                },
                address: {
                    value: loadedAd.ad.address,
                    isValid: true
                },
                name: {
                    value: loadedAd.ad.name,
                    isValid: true
                },
                description: {
                    value: loadedAd.ad.description,
                    isValid: true,
                },
                email: {
                    value: loadedAd.ad.email,
                    isValid: true,
                },
                "price-min": {
                    value: loadedAd.ad.salaryMin,
                    isValid: true
                },
                "price-max": {
                    value: loadedAd.ad.salaryMax,
                    isValid: true
                },
                technology: {
                    value: loadedAd.ad.technology,
                    isValid: true
                },
            }, true);
            setLoadedAd(loadedAd.ad);

        })();
    }, [adId]);


    async function adUpdateSubmitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (auth.userId === null || loadedAd === undefined) {
            return setError("Sorry, please try again");
        }
        const geoRes = await geocode(formState.inputs.address.value);
        if (!geoRes.resStatus) {
            setError(geoRes.resMessage);
        } else {
            const {lat, lon} = geoRes;
            const newAd: AdEntity = {
                id: loadedAd.id,
                name: formState.inputs.name.value,
                title: formState.inputs.title.value,
                address: formState.inputs.address.value,
                description: formState.inputs.description.value,
                creatorId: auth.userId,
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
                `/job/${adId}`,
                'PATCH',
                newAd,
                {
                    'Content-Type': 'application/json'
                }
            );
            setResultInfo(`${res.newAd.title} has been updated`);
        }
    }

    if (!loadedAd) {
        return <div className="center" style={{margin: "2rem"}}><Card style={{padding: "1rem"}}><h2>Could not find
            ad</h2></Card></div>;
    }

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner asOverlay/>
            </div>
        );
    }
    if (resultInfo !== null) {
        return (
            <div className="center margin">
                <Card className="result-info">
                    <p>{resultInfo}</p>
                    <Button onClick={() => setResultInfo(null)}>Add another one</Button>
                </Card>
            </div>);
    }


    return (
        <>
            {error && <ErrorModal className="ads" error={error} onClick={() => clearError()}/>}
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
        </>);
};