import React from 'react';
import {SimpleAdEntity} from 'types';
import '../../utils/fix-map-icon';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './Map.css'


interface Props {
    ads: SimpleAdEntity[];
    adId: string | undefined;
}

export const Map = (props: Props) => {
    const {adId, ads} = props;
    function clickHandler() {
        console.log("setAd")
    }

    const adsNew = adId === undefined ? [...ads] : ads.filter(ad => ad.id === adId);

    return (
        <div className="Map">
            <MapContainer center={[52.3862034, 18.6043395]} zoom={7}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {adsNew.map(ad => (
                    <Marker key={ad.id} position={[ad.lat, ad.lon]}>
                        <Popup className="Map__popup">
                            <div onClick={clickHandler}  className="Map__poput--click">
                                {ad.title}
                            </div>
                        </Popup>
                    </Marker>))}
            </MapContainer>

        </div>
    );
}