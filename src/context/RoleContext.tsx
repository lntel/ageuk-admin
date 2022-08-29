import React, { createContext, FC, useEffect, useReducer, useState } from "react";
import roleReducer, { RoleAction, RoleState } from "../reducer/RoleReducer";

export interface RoleContext {
    state: RoleState;
    dispatch: React.Dispatch<RoleAction>;
}

export const RoleContext = createContext<RoleContext>({
    state: {
        roles: [],
        mode: "CREATE"
    },
    dispatch: () => {}
});

export interface RoleProviderProps {
    children: any;
}

export const RoleProvider: FC<RoleProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(roleReducer, {
        roles: [],
        mode: "CREATE"
    });
    
    return (
        <RoleContext.Provider value={{ state, dispatch }}>
            { children }
        </RoleContext.Provider>
    );
}