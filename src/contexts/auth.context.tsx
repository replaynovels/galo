import React, { Reducer, useEffect, useReducer } from "react";
import { CLEAR_AUTH } from "./reducers/auth.reducer";

export interface IAuthContext {
    authState: IAuth;
    updateAuth: Function;
    clearAuthState: Function;
}

export interface IAuth {
    authenticated: boolean;
    accessToken?: string;
    auth?: any;
    displayName: string;
    email: string;
    emailVerified?: boolean;
    googleToken?: string;
    googleCredential?: any;
    metadata?: any;
    phoneNumber?: string | null;
    photoURL: string | null;
    proactiveRefresh?: any;
    providerData?: any;
    providerId?: string;
    uid: string;
    isAdmin?: boolean;
}

const AuthContext = React.createContext<IAuthContext>({
    authState: {
        authenticated: true,
        accessToken: "",
        displayName: "",
        email: "",
        phoneNumber: "",
        photoURL: "",
        uid: ""
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
        console.log("Payload: ", payload);
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
