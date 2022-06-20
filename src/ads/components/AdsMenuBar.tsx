import React, {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SimpleAdEntity} from "../../../../findjobs-back/types/ad-entity";
import './AdsMenuBar.css';

interface Props {
    path: string | undefined;
    ads: SimpleAdEntity[];
    setAds: (ad: SimpleAdEntity[]) => void;
    sendRequest: any,
}


export const AdsMenuBar = (props: Props) => {
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setsSelectValue] = useState("0");
    const nav = useNavigate();
    const {setAds, sendRequest, ads} = props;

    async function submitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (inputValue === '') return nav("/");
        nav(`/?search=${inputValue}`);
        const loadedAds = await sendRequest(`/job/search/${inputValue}`);
        setAds(loadedAds.ads);
    }


    const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        {
            setsSelectValue(e.target.value);
            switch (e.target.value) {
                case "0":
                    const sortAdsLatest = [...ads].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    setAds(sortAdsLatest);
                    break;
                case "1":
                    const sortAdsLow = [...ads].sort((a, b) => a.salaryMin - b.salaryMin);
                    setAds(sortAdsLow);
                    break;
                case "2":
                    const sortAdsHight = [...ads].sort((a, b) => b.salaryMin - a.salaryMin);
                    setAds(sortAdsHight);
                    break;
                default:
                    break;
            }
        }
    };

    return (
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
            <p>Sort:</p>
            <select value={selectValue} onChange={selectHandler}>
                <option value="0">Latest</option>
                <option value="1">Lowest salary</option>
                <option value="2">Highest salary</option>

            </select>
        </div>
    );
};