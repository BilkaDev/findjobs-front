import {useCallback, useState} from "react";

export const useAuth = () => {

    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | boolean>(false);

    const login = useCallback((userId:string,token:string) => {
        setToken(token)
        setUserId(userId)
    }, [])
    const logout = useCallback(() => {
        setToken(false)
        setUserId(null)
    }, [])

    return {userId,token,login,logout}
}