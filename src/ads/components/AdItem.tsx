import React from 'react';
import {AdEntity} from 'types'
import {LogoImage} from "../../common/components/UiElement/LogoImage";
import {Link} from "react-router-dom";
import {Card} from "../../common/components/UiElement/Card";
import './AdItem.css'


interface Props {
    ad: AdEntity;
}

export const AdItem = (props: Props) => {

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
    } = props.ad


    return (
        <li className="AdItem">
            <Card className="AdItem__card">
                <Link to={`/ad/${id}`}>

                    <div className="AdItem__image">
                        <LogoImage image={image} name={name}/>

                    </div>
                    <div className="AdItem__content">
                        <div className="AdItem__info">
                            <h2>{title}</h2>
                            <h3>{name}</h3>
                            <p className="address">{address}</p>
                        </div>
                        <div className="AdItem__salary">
                            <h2>{salaryMin} - {salaryMax}</h2>
                            <p>{technology}</p>
                        </div>
                    </div>
                </Link>
            </Card>
        </li>
    )
}