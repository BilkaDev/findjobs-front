import React from 'react';
import {AdItem} from "./AdItem";
import {SimpleAdEntity} from 'types'
import {Card} from "../../common/components/UiElement/Card";
import './AdsList.css'


interface Props {
    items: SimpleAdEntity[];
    className?: string | undefined;
}

export const AdsList = (props: Props) => {
    const {items} = props


    if (items.length === 0) {
        return <div className="center" style={{
            margin: "1rem",
            color: "black",
        }}>
            <Card style={{padding: "1rem"}}>
                <h2>No ads found</h2>
            </Card>
        </div>
    }

    return (
        <ul className={`AdsList ${props.className}`}>
            {items.map(ad =>
                <AdItem
                    key={ad.id}
                    ad={ad}
                />)}
        </ul>
    )
}