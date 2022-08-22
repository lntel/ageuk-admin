import { IGpSurgery } from "../types";

export type GpActionType = | "SET_SELECTED" | "SET_SURGERIES"

export interface GpAction {
    state: GpState;
    type: GpActionType;
}

export interface GpState {
    surgeries: IGpSurgery[];
    selectedGp?: IGpSurgery;
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
            
        default:
            return state;
    }
}

export default gpReducer;