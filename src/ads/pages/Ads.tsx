import React, {useEffect, useState} from 'react';
import {AdsList} from "../components/AdsList";
import {Map} from '../components/Map';
import {useLocation, useParams} from "react-router-dom";
import {Ad} from "../components/Ad";
import {useHttpClient} from "../../common/hooks/http-hook";
import {ErrorModal} from "../../common/components/UiElement/ErrorModal";
import {LoadingSpinner} from "../../common/components/UiElement/LoadingSpinner";
import {SimpleAdEntity, AdEntity} from '../../../../findjobs-back/types/ad-entity';
import {AdsMenuBar} from "../components/AdsMenuBar";
import './Ads.css';


export const Ads = () => {
    const [loadedAds, setLoadedAds] = useState<SimpleAdEntity[]>([]);
    const [loadedAd, setLoadedAd] = useState<AdEntity>();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
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

    return (<>
        {error && <ErrorModal className="ads" error={error} onClick={() => clearError()}/>}

        <div className="Ads">
            <div className="AdsView">
                <AdsMenuBar sendRequest={sendRequest} path={adIdPath} setAds={setLoadedAds}/>
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