import {useMap} from "react-leaflet";
import {LatLngExpression} from "leaflet";


interface Props {
    coords : LatLngExpression;
}

export function ChangeView(props: Props) {
    const map = useMap();
    map.setView(props.coords);

    return null;
}
