import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AdsList} from "../components/AdsList";

import {Card} from "../../common/components/UiElement/Card";
import {Button} from "../../common/components/FormElements/Buttons";
import {SimpleAdEntity} from "types";
import './UserAds.css';
import {useHttpClient} from "../../common/hooks/http-hook";
import {ErrorModal} from "../../common/components/UiElement/ErrorModal";
import {LoadingSpinner} from "../../common/components/UiElement/LoadingSpinner";


export const UserAds = () => {
    const {userId} = useParams();
    const [userAds, setUserAds] = useState<SimpleAdEntity []>([]);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();


    useEffect(() => {
        (async () => {
                const loadedAds = await sendRequest(`/job/user/${userId}/`);
                setUserAds(loadedAds.ads);
            }
        )();
    }, [userId]);

    if (error){
        return <ErrorModal className="ads" error={error} onClick={() => clearError()}/>
    }

    if (userAds.length === 0) {
        return <div className="center" style={{
            margin: "1rem",
            color: "black",
        }}>
            <Card style={{padding: "1rem",}}>
                <h2>No ads found. Maybe create one?</h2>
                <Button to="/new">Add ad.</Button>
            </Card>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay/>
                </div>
            )}
        </div>;
    }

    return (
        <>
            <AdsList items={userAds} className="UserAds"/>
        </>
    );

};