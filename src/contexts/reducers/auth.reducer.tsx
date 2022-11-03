import { IAuth } from "../auth.context";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../firebase/setupFirebase";
import { getAuth, signOut } from "firebase/auth";

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

export const authReducer = async (
    state: IAuth = initialAuthState,
    action: IAction
) => {
    switch(action.type) {
        case LOGIN:
            if(!action.payload || !action.payload.uid){
                console.error("no uid found");
                return initialAuthState;
            }
            const loggedInState = {
                ...state,
                ...action.payload,
                authenticated: true,
            };
            localStorage.setItem("auth", JSON.stringify(loggedInState));
            const {displayName, email, photoURL, uid} = action.payload;
            await setDoc(doc(db, "users", action.payload.uid), {
                displayName, email, photoURL, uid
            }, {merge: true});
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
            const auth = getAuth();
            await signOut(auth)
            return initialAuthState;
        default:
            return state;
    }
};
