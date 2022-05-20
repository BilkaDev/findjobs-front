import React from 'react';

import './Ads.css'
import {AdsList} from "../components/AdsList";

export const Ads = () => {

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
            lat: 52.0932937,
            lon: 14.3430061,
        }
        ]


    return (
        <div className="Ads">
            <div className="search-bar">
                <div className="search-bar__filter">
                    <h2>search</h2>
                    <h2>sort</h2>
                </div>
            </div>
            <AdsList
                items={DUMMY_ADS}
                />
        </div>)
}