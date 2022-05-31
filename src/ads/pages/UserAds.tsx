import React from "react";
import {useParams} from "react-router-dom";
import {AdsList} from "../components/AdsList";

import {Card} from "../../common/components/UiElement/Card";
import {Button} from "../../common/components/FormElements/Buttons";
import './UserAds.css'

const DUMMY_ADS = [
    {
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
    },
    {
        id: 'adsid2',
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

    },
    {
        id: 'adsid2',
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

    },
    {
        id: 'adsid2',
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

    },
]

export const UserAds = () => {
    const {userId} = useParams()
    const userAds = DUMMY_ADS.filter(ad => ad.creatorId === userId)

    if (userAds.length === 0) {
        return <div className="center" style={{
            margin: "1rem",
            color: "black",
        }}>
            <Card style={{padding: "1rem",}}>
                <h2>No ads found. Maybe create one?</h2>
                <Button to="/new">Add ad.</Button>
            </Card>
        </div>
    }

    return (
        <AdsList items={userAds} className="UserAds"/>
    )

}