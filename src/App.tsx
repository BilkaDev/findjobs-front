import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Ads} from "./ads/pages/Ads";
import {NewAds} from "./ads/pages/NewAds";


export const App = () => (
<>
    <Routes>
        <Route path="/" element={<Ads/>}/>
        <Route path="/new" element={<NewAds/>}/>
        <Route path="*" element={<Ads/>}/>
    </Routes>
</>
);

