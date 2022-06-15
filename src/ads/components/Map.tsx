import React, {useEffect, useState} from 'react';
import {SimpleAdEntity, AdEntity} from 'types';
import '../../common/utils/fix-map-icon';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {useNavigate} from "react-router-dom";
import './Map.css';
import iconBlack from './../../assets/images/marker-black.png';
import iconBlue from './../../assets/images/marker-blue.png';
import {icon, LatLngExpression} from "leaflet";
import {ChangeView} from "./ChangeView";


interface Props {
    ads: SimpleAdEntity[];
    ad: AdEntity | undefined;
    adId: string | undefined;
}

export const Map = (props: Props) => {
    const nav = useNavigate();
    const [centerLocation, setCenterLocation] = useState<LatLngExpression>([52.3862034, 18.6043395]);

    useEffect(() => {
        if (props.ad) {
            setCenterLocation([props.ad.lat, props.ad.lon]);
        }
    }, [props.ad]);

    function clickHandler(adId: string) {
        nav(`/ad/${adId}`);
    }

    const drawMarkers = props.ads.map(ad => (
        <Marker key={ad.id}
                position={[ad.lat, ad.lon]}
                icon={icon(
                    {
                        iconUrl: (props.ad !== undefined && props.ad.id === ad.id) ? iconBlack : iconBlue
                    })
                }>
            <Popup className="Map__popup">
                <div onClick={() => clickHandler(ad.id)} className="Map__poput--click">
                    {ad.title}
                </div>
            </Popup>
        </Marker>));

    return (
        <div className="Map">
            <MapContainer
                center={centerLocation}
                zoom={7}>
                <ChangeView coords={centerLocation}/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {drawMarkers}

            </MapContainer>

        </div>
    );
};