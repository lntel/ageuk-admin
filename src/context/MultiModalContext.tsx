import React, { createContext, FC, useEffect, useState } from 'react'

// https://stackoverflow.com/a/60949057

// TODO if possible, make the context strictly typed to an interface/generic this will make the dev experience much better
export interface MultiModalContextType<T> {
    state: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
}

export const MultiModalContext = createContext<MultiModalContextType<any>>({
    state: {},
    setState: (e) => {}
});

export interface MultiModalProviderProps<T> {
    children: any;
}

export const MultiModalProvider = <T extends object>(props: React.PropsWithChildren<MultiModalProviderProps<T>>) => {

    const [state, setState] = useState<T>();

    return (
        <MultiModalContext.Provider value={{ state, setState }}>
            { props.children }
        </MultiModalContext.Provider>
    )
}