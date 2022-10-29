import React, { Reducer, useEffect, useReducer } from "react";
import { IAllowedRolesObj } from "../interfaces/roles.interface";
import { CLEAR_AUTH } from "./reducers/auth.reducer";

export interface IAuthContext {
    authState: IAuth;
    updateAuth: Function;
    clearAuthState: Function;
}

export interface IAuth {
    authenticated: boolean;
    userName?: string;
    roles?: string[];
    allowedRoles?: IAllowedRolesObj;
}

const AuthContext = React.createContext<IAuthContext>({
    authState: {
        authenticated: true,
        roles: [],
        allowedRoles: {},
    },
    updateAuth: () => {},
    clearAuthState: () => {},
});

export const AuthProvider = ({ children, reducer, initialState }: any) => {
    const [globalAuthState, authDispatch] = useReducer<Reducer<IAuth, any>>(
        reducer,
        initialState
    );

    const updateAuth = (type: string, payload: IAuth) => {
        authDispatch({ type, payload });
    };

    const clearAuthState = () => {
        return authDispatch({ type: CLEAR_AUTH });
    };

    useEffect(() => {
        if (localStorage.authState?.authenticated) {
            return localStorage.clear();
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authState: globalAuthState,
                updateAuth,
                clearAuthState,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const AuthStateConsumer = AuthContext.Consumer;

export default AuthContext;
