import React from 'react';
import {AdItem} from "./AdItem";
import {SimpleAdEntity} from 'types'
import './AdsList.css'


interface Props {
    items: SimpleAdEntity[];
}

export const AdsList = (props: Props) => {
    const {items} = props


    if (props.items.length === 0) {
        return <div className="center">
            <h2>No ads found</h2>
        </div>
    }

    return (
            <ul className="AdsList">
                {items.map(ad =>
                    <AdItem
                        key={ad.id}
                        ad={ad}
                    />)}
            </ul>
    )
}