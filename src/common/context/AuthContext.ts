import React, {createContext} from 'react';

interface AuthContextType {
    userId: string | null;
    setUserId: (userId: string) => void;
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext(
    {
        isLoggedIn: false,
        userId: null,
        // token: null,
        login: () => {
        },
        setUserId: () => {
        },
        logout: () => {
        }
    } as AuthContextType);

