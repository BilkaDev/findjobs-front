import {useCallback, useEffect, useState} from "react";

let logutTimer: NodeJS.Timeout | undefined;
export const useAuth = () => {

    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | boolean>(false);
    const [tokenExpiration, setTokenExpired] = useState<Date | null>(null);

    const login = useCallback((userId: string, token: string, expiration?: Date) => {
        setToken(token);
        setUserId(userId);
        const tokenExpiration = expiration || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpired(tokenExpiration)
        localStorage.setItem('token', JSON.stringify({
            userId,
            token,
            expiration: tokenExpiration.toISOString(),
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(false);
        setUserId(null);
        setTokenExpired(null)
        localStorage.removeItem('token');
    }, []);

    useEffect(() => {
        const getData = localStorage.getItem('token');
        const storedData = getData && JSON.parse(getData);
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.userId, storedData.token,new Date(storedData.expiration));
        }
    }, [login]);

    useEffect(()=>{
        if (token && tokenExpiration){
            const remainingTime = tokenExpiration.getTime() - new Date().getTime();
            logutTimer = setTimeout(logout, remainingTime)
        }else {
            clearTimeout(logutTimer);
        }
    },[token, logout,tokenExpiration])

    return {userId, token, login, logout};
};