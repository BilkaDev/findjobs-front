import React from 'react';

import {AdsList} from "../components/AdsList";
import {Map} from '../components/Map'
import './Ads.css'
import {useParams} from "react-router-dom";
import {Ad} from "../components/Ad";

export const Ads = () => {
    const {adId : adIdPath} = useParams()

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
    ]


    return (
        <div className="Ads">
            <div className="AdsView">
                <div className="AdsView__menu">
                    <form className="search-form">
                        <input type="text"/>
                        <button>
                            <img src="https://img.icons8.com/material-outlined/24/000000/search--v1.png" alt="search-icon"/>
                        </button>
                    </form>
                    <h2>sort</h2>
                </div>
                {adIdPath ? <Ad adId={adIdPath}/>: <AdsList
                    items={DUMMY_ADS}
                />}
            </div>
            <Map ads={DUMMY_ADS} adId={adIdPath}/>
        </div>)
}