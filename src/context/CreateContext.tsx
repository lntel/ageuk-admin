import React, { createContext, FC, useEffect, useReducer, useState } from "react";
import createReducer, { CreateAction, CreateState } from "../reducer/CreateReducer";

export interface CreateContext {
    state: CreateState;
    dispatch: React.Dispatch<CreateAction>;
}

export const CreateContext = createContext<CreateContext>({
    state: {
        data: [],
        mode: "CREATE"
    },
    dispatch: () => {}
});

export interface RoleProviderProps {
    children: any;
}

export const CreateProvider: FC<RoleProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(createReducer, {
        data: [],
        mode: "CREATE"
    });
    
    return (
        <CreateContext.Provider value={{ state, dispatch }}>
            { children }
        </CreateContext.Provider>
    );
}