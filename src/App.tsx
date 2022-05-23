import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Ads} from "./ads/pages/Ads";
import {NewAds} from "./ads/pages/NewAds";
import {MainNavigation} from "./common/components/navigation/MainNavigation";
import {UserAds} from "./ads/pages/UserAds";
import './App.css';


export const App = () => (
    <>
        <main>
            <MainNavigation/>
            <Routes>
                <Route path="/" element={<Ads/>}/>
                <Route path="/new" element={<NewAds/>}/>
                <Route path="/:userId/ads" element={<UserAds/>}/>
                <Route path="*" element={<Ads/>}/>
            </Routes>
        </main>
    </>
);

