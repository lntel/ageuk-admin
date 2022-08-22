import React, { createContext, FC, useEffect, useReducer, useState } from "react";
import gpReducer, { GpAction, GpState } from "../reducer/GpReducer";
import { IGpSurgery } from "../types";

export interface GpContext {
    state: GpState;
    dispatch: React.Dispatch<GpAction>;
}

export const GpContext = createContext<GpContext>({
    state: {
        surgeries: [],
    },
    dispatch: () => {}
});

export interface GpProviderProps {
    children: any;
}

export const GpProvider: FC<GpProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(gpReducer, {
        surgeries: []
    });

    return (
        <GpContext.Provider value={{ state, dispatch }}>
            { children }
        </GpContext.Provider>
    );
}