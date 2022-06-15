import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {AdsList} from "../components/AdsList";

import {Card} from "../../common/components/UiElement/Card";
import {Button} from "../../common/components/FormElements/Buttons";
import {SimpleAdEntity} from "types";
import './UserAds.css';


export const UserAds = () => {
    const {userId} = useParams();
    const [userAds, setUserAds] = useState<SimpleAdEntity []>([]);

    if (userAds.length === 0) {
        return <div className="center" style={{
            margin: "1rem",
            color: "black",
        }}>
            <Card style={{padding: "1rem",}}>
                <h2>No ads found. Maybe create one?</h2>
                <Button to="/new">Add ad.</Button>
            </Card>
        </div>;
    }

    return (
        <AdsList items={userAds} className="UserAds"/>
    );

};