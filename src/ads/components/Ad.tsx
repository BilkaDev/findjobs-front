import React, {useContext, useEffect, useState} from "react";
import {Card} from "../../common/components/UiElement/Card";
import {LogoImage} from "../../common/components/UiElement/LogoImage";
import {Button} from "../../common/components/FormElements/Buttons";
import {Modal} from "../../common/components/UiElement/Modal";
import {Map} from "./Map";
import {AuthContext} from "../../common/context/AuthContext";
import {AdEntity, SimpleAdEntity} from "../../../../findjobs-back/types/ad-entity";
import './Ad.css';
import {useHttpClient} from "../../common/hooks/http-hook";
import {ErrorModal} from "../../common/components/UiElement/ErrorModal";
import {useNavigate} from "react-router-dom";
import {LoadingSpinner} from "../../common/components/UiElement/LoadingSpinner";


interface Props {
    adId: string;
    ads: SimpleAdEntity[];
    setAd: any;
}

export const Ad = (props: Props) => {
    const [loadedAd, setLoadedAd] = useState<AdEntity>();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [showConfirmModal, setShowConfirmModal,] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const {adId} = props;
    const nav = useNavigate();

    const auth = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            const loadedAd = await sendRequest(`/job/${adId}`);
            setLoadedAd(loadedAd.ad);
            props.setAd(loadedAd.ad as AdEntity);
        })();

    }, [adId]);

    function confirmDeleteHandler() {
        //@todo connect to be delete ad!
        console.log("DELETE...");
    }

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);
    if (loadedAd === undefined) {
        return <>
            {error && <ErrorModal className="ads" error={error} onClick={() => {
                clearError();
                nav('/');
            }}/>}
            {isLoading && (
                <div className="center">
                    <LoadingSpinner/>
                </div>
            )}
        </>;
    }


    const {
        id,
        name,
        image,
        title,
        address,
        salaryMin,
        salaryMax,
        technology,
        lat,
        lon,
        creatorId,
    } = loadedAd;
    return (
        <>
            {error && <ErrorModal className="ads" error={error} onClick={() => clearError()}/>}
            {showConfirmModal &&
                <Modal
                    header="Are you sure?"
                    footer={
                        <>
                            <Button inverse onClick={() => setShowConfirmModal(false)}>CANCEL</Button>
                            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                        </>
                    }
                ><p>Do you want to proceed and delete this ad? Please note that it can't be undone therafter.</p>
                </Modal>}
            {showMap && <Modal className="show-map"
                               header={address}
                               footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map ads={props.ads} ad={loadedAd} adId={adId}/>
                </div>
            </Modal>}
            <Card className="Ad">
                <div className="Ad__image">
                    <LogoImage image={image} name={name}/>
                </div>
                <div className="AdItem__content">
                    <div className="AdItem__info">
                        <h2>Name: {name}</h2>
                        <h3>{title}</h3>
                        <p className="address">Address: {address}</p>
                    </div>
                    <div className="AdItem__salary">
                        <h2>{salaryMin}$ - {salaryMax}$</h2>
                        <p>Technology: {technology}</p>
                    </div>
                    <div className="Ad__description">
                        <p>Lorem ipsum dolor siquaLorem elit. Nobis quisquam raorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Nobis quisquam raLorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Nobis quisquam raLorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quisquam
                            ratione veniam vitae! Accusamus accusantium debitis distinctio, earum magni obcaecati.</p>
                    </div>
                    {auth.isLoggedIn && <Button to={`/edit-ad/${id}`}>EDIT</Button>}
                    <Button className="Ad__show-map" inverse onClick={openMapHandler}>View on map</Button>
                    {auth.isLoggedIn && <Button danger onClick={() => setShowConfirmModal(true)}>DELETE</Button>}
                </div>
            </Card>
        </>
    );
};