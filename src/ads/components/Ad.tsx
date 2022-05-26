import React from "react";
import {Card} from "../../common/components/UiElement/Card";
import {LogoImage} from "../../common/components/UiElement/LogoImage";

import './Ad.css'
import {Button} from "../../common/components/FormElements/Buttons";


const DUMMY_AD = {
    id: 'adsid1',
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

}

interface Props {
    adId: string;
}

export const Ad = (props: Props) => {
    const {adId} = props

    const {
        id,
        name,
        image,
        title,
        address,
        salaryMin,
        salaryMax,
        technology,
        lat,
        lon,
        creatorId,
    } = DUMMY_AD

    //@todo if null return file not find


    return (
        <Card className="Ad">
            <div className="Ad__image">
                <LogoImage image={image} name={name}/>
            </div>
            <div className="AdItem__content">
                <div className="AdItem__info">
                    <h2>Name: {name}</h2>
                    <h3>{title}</h3>
                    <p className="address">Address: {address}</p>
                </div>
                <div className="AdItem__salary">
                    <h2>{salaryMin}$ - {salaryMax}$</h2>
                    <p>Technology: {technology}</p>
                </div>
                <div className="Ad__description">
                    <p>Lorem ipsum dolor siquaLorem elit. Nobis quisquam raorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quisquam raLorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quisquam raLorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quisquam ratione veniam vitae! Accusamus accusantium debitis distinctio, earum magni obcaecati.</p>
                </div>
                <Button to={`/places/${id}`}>EDIT</Button>
                <Button danger>DELETE</Button>
            </div>

        </Card>
    )
}