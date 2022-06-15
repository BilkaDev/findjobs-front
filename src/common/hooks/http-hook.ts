import {useCallback, useEffect, useRef, useState} from "react";
import {LoginUserEntity, UserEntity} from 'types';


export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>();


    let statusError = 500;
    const sendRequest = useCallback(
        async (
            url: string,
            method = 'GET',
            body: Omit<UserEntity, 'id'> | LoginUserEntity | null = null,
            headers = {}
        ) => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:3001${url}`, {
                    method,
                    headers,
                    body: body && {body: body instanceof FormData ? body : JSON.stringify(body)}.body,
                });

                const responseData = await response.json();
                if (!response.ok) {
                    statusError = responseData;
                    throw new Error(responseData.message);
                }
                setIsLoading(false);

                return responseData;
            } catch (e: any) {
                console.log(e);
                setError(statusError === 500 ? 'Sorry, please try again later' : e.message);
                setIsLoading(false);

                throw e;
            }


        }, []);
    const clearError = () => {
        setError(null);
    };
    return {isLoading, error, sendRequest, setError, clearError};
};