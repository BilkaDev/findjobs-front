import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {Ads} from "./ads/pages/Ads";
import {NewAds} from "./ads/pages/NewAds";
import {MainNavigation} from "./common/components/navigation/MainNavigation";
import {UserAds} from "./ads/pages/UserAds";
import {UpdateAd} from "./ads/pages/UpdateAd";
import {Auth} from "./users/pages/Auth";
import {AuthContext} from './common/context/AuthContext';
import './App.css';


export const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (

        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            userId: null,
            login: () => setIsLoggedIn(true),
            logout: () => setIsLoggedIn(false),
        }}>
            <main>
                <MainNavigation/>
                <Routes>
                    <Route path="/" element={<Ads/>}/>
                    <Route path="/ad/:adId" element={<Ads/>}/>
                    <Route path="/new" element={<NewAds/>}/>
                    <Route path="/edit-ad/:adId" element={<UpdateAd/>}/>
                    <Route path="/:userId/ads" element={<UserAds/>}/>
                    <Route path="/auth" element={<Auth/>}/>

                    <Route path="*" element={<Ads/>}/>
                </Routes>
            </main>
        </AuthContext.Provider>
    )
};

