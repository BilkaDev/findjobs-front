import React, {useContext, useState} from "react";
import {Card} from "../../common/components/UiElement/Card";
import {LogoImage} from "../../common/components/UiElement/LogoImage";
import {Button} from "../../common/components/FormElements/Buttons";
import {Modal} from "../../common/components/UiElement/Modal";
import {Map} from "./Map"
import {AuthContext} from "../../common/context/AuthContext";
import { SimpleAdEntity } from "../../../../findjobs-back/types/ad-entity";
import './Ad.css'


const DUMMY_AD = {
    id: 'adsid1',
    name: 'Firma',
    image: 'https://cdn.pixabay.com/photo/2021/08/11/18/06/paladin-6539115_960_720.png',
    title: 'Junior Javascript, React',
    address: 'Katowice, mariacka 4',
    salaryMin: 2000,
    salaryMax: 3000,
    technology: 'JS,React',
    lat: 52.0932937,
    lon: 14.3430061,
    creatorId: 'userId',

}

interface Props {
    adId: string;
}

export const Ad = (props: Props) => {
    const [showConfirmModal, setShowConfirmModal,] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const {adId} = props
    const auth = useContext(AuthContext)

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
    } = DUMMY_AD

    //@todo if null return file not find


    function confirmDeleteHandler() {
        //@todo connect to be delete ad!
        console.log("DELETE...")
    }

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    return (
        <>
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
                               onCancel={closeMapHandler}
                               header={address}
                               footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map ads={[DUMMY_AD] as SimpleAdEntity[]} adId={adId}/>
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
    )
}