import { IAuth } from "../auth.context";

export const UPDATE_AUTH = "UPDATE_AUTH";
export const CLEAR_AUTH = "CLEAR_AUTH";
export const LOGIN = "LOGIN";

let localStorageAuth = localStorage.getItem("auth");
export const initialAuthState: IAuth = localStorageAuth
    ? JSON.parse(localStorageAuth)
    : { authenticated: false };

interface IAction {
    type: string;
    payload?: IAuth;
}

export const authReducer = (
    state: IAuth = initialAuthState,
    action: IAction
) => {
    switch (action.type) {
        case LOGIN:
            const loggedInState = {
                ...state,
                ...action.payload,
                authenticated: true,
            };
            localStorage.setItem("auth", JSON.stringify(loggedInState));
            return loggedInState;
        case UPDATE_AUTH:
            localStorage.setItem(
                "auth",
                JSON.stringify({ ...state, ...action.payload })
            );
            return {
                ...state,
                ...action.payload,
            };
        case CLEAR_AUTH:
            localStorage.clear();
            sessionStorage.clear();
            return {
                authenticated: false,
            };
        default:
            return state;
    }
};
