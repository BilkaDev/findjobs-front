import React, {FormEvent, useEffect, useState} from 'react';
import {AdsList} from "../components/AdsList";
import {Map} from '../components/Map';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Ad} from "../components/Ad";
import {useHttpClient} from "../../common/hooks/http-hook";
import {ErrorModal} from "../../common/components/UiElement/ErrorModal";
import {LoadingSpinner} from "../../common/components/UiElement/LoadingSpinner";
import {SimpleAdEntity, AdEntity} from '../../../../findjobs-back/types/ad-entity';
import './Ads.css';

export const Ads = () => {
    const [loadedAds, setLoadedAds] = useState<SimpleAdEntity[]>([]);
    const [loadedAd, setLoadedAd] = useState<AdEntity>();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [inputValue, setInputValue] = useState('');
    const nav = useNavigate();
    let {adId: adIdPath} = useParams();
    const query = new URLSearchParams(useLocation().search).get("search");
    useEffect(() => {
        (async () => {
                if (!adIdPath && !query?.length) {
                    const loadedAds = await sendRequest('/job/');
                    setLoadedAds(loadedAds.ads);
                    setLoadedAd(undefined);
                }
            }
        )();
    }, [adIdPath, query]);

    async function submitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (inputValue === '') return;
        nav(`/?search=${inputValue}`);
        const loadedAds = await sendRequest(`/job/search/${inputValue}`);
        setLoadedAds(loadedAds.ads);
    }

    return (<>
        {error && <ErrorModal className="ads" error={error} onClick={() => clearError()}/>}

        <div className="Ads">
            <div className="AdsView">
                <div className="AdsView__menu">
                    <form className="search-form" onSubmit={submitForm}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                        <button>
                            <img src="https://img.icons8.com/material-outlined/24/000000/search--v1.png"
                                 alt="search-icon"/>
                        </button>
                    </form>
                    <h2>sort</h2>
                </div>
                {isLoading && (
                    <div className="center">
                        <LoadingSpinner/>
                    </div>
                )}
                {adIdPath ? <Ad ads={loadedAds} adId={adIdPath} setAd={setLoadedAd}/> : <AdsList
                    items={loadedAds}
                />}
            </div>
            <Map ads={loadedAds} ad={loadedAd} adId={adIdPath}/>
        </div>
    </>);
};