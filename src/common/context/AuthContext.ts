import React, {createContext} from 'react';

interface AuthContextType {
    userId: string | null;
    setUserId: (userId: string) => void;
    isLoggedIn: boolean;
    token: string | boolean;
    setToken: (token: string) => void;
    login: (userId: string,token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext(
    {
        isLoggedIn: false,
        userId: null,
        token: false,
        login: () => {
        },
        setUserId: () => {
        },
        setToken: () => {
        },
        logout: () => {
        }
    } as AuthContextType);

