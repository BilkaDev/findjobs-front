import React from 'react';
import {SimpleAdEntity} from 'types';
import '../../common/utils/fix-map-icon';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {useNavigate} from "react-router-dom";
import './Map.css'


interface Props {
    ads: SimpleAdEntity[];
    adId: string | undefined;
}

export const Map = (props: Props) => {
    const {adId, ads} = props;

    const nav = useNavigate();

    function clickHandler(adId: string) {
        nav(`/ad/${adId}`)
    }

    return (
        <div className="Map">
            <MapContainer
                center={props.ads.length === 1 ? [props.ads[0].lat, props.ads[0].lon] : [52.3862034, 18.6043395]}
                zoom={7}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {props.ads.map(ad => (
                    <Marker key={ad.id} position={[ad.lat, ad.lon]}>
                        <Popup className="Map__popup">
                            <div onClick={() => clickHandler(ad.id)} className="Map__poput--click">
                                {ad.title}
                            </div>
                        </Popup>
                    </Marker>))}
            </MapContainer>

        </div>
    );
}