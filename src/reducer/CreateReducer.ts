import { IGpSurgery, IRole } from "../types";

export type CreateActionType = | "SET_SELECTED" | "SET_DATA" | "SET_MODE"
export type CreateActionMode = | "CREATE" | "UPDATE";

export interface CreateAction {
    state: CreateState;
    type: CreateActionType;
}

export interface CreateState {
    data: any;
    selected?: any;
    mode: CreateActionMode;
}

// https://github.com/Yudhajitadhikary/ContextApi-with-Hooks/blob/master/src/reducers/bookReducer.js
const createReducer = (state: CreateState, action: CreateAction) => {
    switch(action.type) {
        case "SET_SELECTED":
            return {
                ...state,
                selectedRole: action.state.selected   
            }

        case "SET_DATA":
            return {
                ...state,
                data: action.state.data
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

export default createReducer;