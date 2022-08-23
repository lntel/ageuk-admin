import { IGpSurgery } from "../types";

export type GpActionType = | "SET_SELECTED" | "SET_SURGERIES" | "SET_MODE"
export type GpActionMode = | "CREATE" | "UPDATE";

export interface GpAction {
    state: GpState;
    type: GpActionType;
}

export interface GpState {
    surgeries: IGpSurgery[];
    selectedGp?: IGpSurgery;
    mode: GpActionMode;
}

// https://github.com/Yudhajitadhikary/ContextApi-with-Hooks/blob/master/src/reducers/bookReducer.js
const gpReducer = (state: GpState, action: GpAction) => {
    switch(action.type) {
        case "SET_SELECTED":
            return {
                ...state,
                selectedGp: action.state.selectedGp   
            }

        case "SET_SURGERIES":
            return {
                ...state,
                surgeries: action.state.surgeries
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

export default gpReducer;