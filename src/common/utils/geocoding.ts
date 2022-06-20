export const geocode = async (address: string): Promise<{
    lat: number;
    lon: number;
    resStatus: true;
} | {
    resStatus: false,
    resMessage: string;
}> => {
    try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const geoData = await geoRes.json();
        const lat = parseFloat(geoData[0].lat);
        const lon = parseFloat(geoData[0].lon);
        return {lat, lon, resStatus: true};
    } catch (e) {
        return {
            resStatus: false,
            resMessage: "Please check the address",
        };
    }
};

