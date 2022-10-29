import { AuthProvider } from "./auth.context";
import { authReducer, initialAuthState } from "./reducers/auth.reducer";

const GlobalStateProvider = (props: any) => (
    <AuthProvider reducer={authReducer} initialState={initialAuthState}>
        {props.children}
    </AuthProvider>
);

export default GlobalStateProvider;
