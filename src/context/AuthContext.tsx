import { createContext, FC, useEffect, useReducer } from "react";
import authReducer, { AuthAction, AuthState } from "../reducer/AuthReducer";

export interface AuthContext {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContext>({
    state: {
        accessToken: "",
        refreshToken: ""
    },
    dispatch: () => {}
});

export interface AuthProviderProps {
    children: any;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        accessToken: "",
        refreshToken: "",
    }, (defaultState) => {
        const data = localStorage.getItem("tokens");

        if(!data) return {
            accessToken: "",
            refreshToken: ""
        };

        const parsedData = JSON.parse(data);
        
        return {
            accessToken: parsedData.accessToken,
            refreshToken: parsedData.refreshToken
        }
    });

    useEffect(() => {
        
        localStorage.setItem("tokens", JSON.stringify(state));

    }, [state])
    

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            { children }
        </AuthContext.Provider>
    );
}