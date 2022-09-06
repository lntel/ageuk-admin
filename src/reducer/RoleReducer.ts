import { IGpSurgery, IRole } from "../types";

export type RoleActionType = | "SET_SELECTED" | "SET_ROLES" | "SET_MODE"
export type RoleActionMode = | "CREATE" | "UPDATE";

export interface RoleAction {
    state: RoleState;
    type: RoleActionType;
}

export interface RoleState {
    roles: IRole[];
    selectedRole?: IRole;
    mode: RoleActionMode;
}

// https://github.com/Yudhajitadhikary/ContextApi-with-Hooks/blob/master/src/reducers/bookReducer.js
const roleReducer = (state: RoleState, action: RoleAction) => {
    switch(action.type) {
        case "SET_SELECTED":
            return {
                ...state,
                selectedRole: action.state.selectedRole   
            }

        case "SET_ROLES":
            return {
                ...state,
                roles: action.state.roles
            }

        case "SET_MODE":
            return {
                ...state,
                mode: action.state.mode
            }
            
        default:
            return state;
    }
}

export default roleReducer;