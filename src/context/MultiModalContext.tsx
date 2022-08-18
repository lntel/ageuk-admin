import React, { createContext, FC, useEffect, useState } from 'react'


// TODO if possible, make the context strictly typed to an interface/generic this will make the dev experience much better
export interface MultiModalContextType {
    state: any;
    setState: React.Dispatch<React.SetStateAction<any>>;
}

export const MultiModalContext = createContext<MultiModalContextType>({
    state: {},
    setState: (e) => {}
});

export interface MultiModalProviderProps {
    children: any;
}

export const MultiModalProvider: FC<MultiModalProviderProps> = ({ children }) => {

    const [state, setState] = useState<any>({});

    useEffect(() => {
        console.log(state)
    }, [state])
    

    return (
        <MultiModalContext.Provider value={{ state, setState }}>
            { children }
        </MultiModalContext.Provider>
    )
}