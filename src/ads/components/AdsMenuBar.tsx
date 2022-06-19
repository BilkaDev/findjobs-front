import React, {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import { SimpleAdEntity } from "../../../../findjobs-back/types/ad-entity";

interface Props {
    path: string | undefined;
    setAds: (ad: SimpleAdEntity[])=> void;
    sendRequest: any,
}

export const AdsMenuBar = (props: Props) => {
    const [inputValue, setInputValue] = useState('');

    const nav = useNavigate();
    const {setAds, sendRequest} = props;


    async function submitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (inputValue === '') return nav("/");
        nav(`/?search=${inputValue}`);
        const loadedAds = await sendRequest(`/job/search/${inputValue}`);
        setAds(loadedAds.ads);
    }

    return(
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
    )
}