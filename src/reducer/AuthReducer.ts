export type AuthActionType = | "SET_ACCESS_TOKEN" | "SET_REFRESH_TOKEN" | "REFRESH_TOKENS";

export interface AuthAction {
    state: AuthState;
    type: AuthActionType;
} 

export interface AuthState {
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
}

const authReducer = (state: AuthState, action: AuthAction) => {
    switch(action.type) { 
        case "SET_ACCESS_TOKEN":
            return {
                ...state,
                accessToken: action.state.accessToken
            }

        case "SET_REFRESH_TOKEN":
            return {
                ...state,
                refreshToken: action.state.refreshToken
            }

        default:
            return state;
    }
}

export default authReducer;