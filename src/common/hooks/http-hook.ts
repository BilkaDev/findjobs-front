import {useCallback, useEffect, useRef, useState} from "react";
import {LoginUserEntity, UserEntity} from 'types'



export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>();


    const sendRequest = useCallback(
        async (
            url: string,
            method = 'GET',
            body:  Omit<UserEntity,'id'>| LoginUserEntity | null = null,
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
                    throw new Error(responseData.message);
                }
                setIsLoading(false);

                return responseData;
            } catch (e:any) {
                setError(e.message );
                setIsLoading(false);

                throw e;
            }


        }, []);
    const clearError = () => {
        setError(null);
    };
    return {isLoading, error, sendRequest, setError, clearError};
};