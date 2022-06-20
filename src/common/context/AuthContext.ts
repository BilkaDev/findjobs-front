import React, {createContext} from 'react';

interface AuthContextType {
    userId: string | null;
    isLoggedIn: boolean;
    token: string | boolean;
    login: (userId: string,token: string, expirations?: Date) => void;
    logout: () => void;
}

export const AuthContext = createContext(
    {
        isLoggedIn: false,
        userId: null,
        token: false,
        login: () => {
        },
        logout: () => {
        }
    } as AuthContextType);

