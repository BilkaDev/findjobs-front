import React, {useCallback, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {Ads} from "./ads/pages/Ads";
import {NewAds} from "./ads/pages/NewAds";
import {MainNavigation} from "./common/components/navigation/MainNavigation";
import {UserAds} from "./ads/pages/UserAds";
import {UpdateAd} from "./ads/pages/UpdateAd";
import {Auth} from "./users/pages/Auth";
import {AuthContext} from './common/context/AuthContext';
import './App.css';
import {useAuth} from "./common/hooks/auth-hook";


export const App = () => {
    const {login,logout,token,userId} = useAuth()

    let routes;


    if (token) {
        routes = (
            <Routes>
                <Route path="/" element={<Ads/>}/>
                <Route path="/new" element={<NewAds/>}/>
                <Route path="/ad/:adId" element={<Ads/>}/>
                <Route path="/edit-ad/:adId" element={<UpdateAd/>}/>
                <Route path="/:userId/ads" element={<UserAds/>}/>
                <Route path="*" element={<Ads/>}/>
            </Routes>
        )

    } else routes = (
        <Routes>
            <Route path="/" element={<Ads/>}/>
            <Route path="/ad/:adId" element={<Ads/>}/>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="*" element={<Ads/>}/>
        </Routes>
    )


    return (

        <AuthContext.Provider value={{
            isLoggedIn: !!token,
            userId,
            token,
            login,
            logout,
        }}>
            <main>
                <MainNavigation/>
                {routes}
            </main>
        </AuthContext.Provider>
    )
};

