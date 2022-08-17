import React, { createContext, FC, useEffect, useState } from "react";
import { IGpSurgery } from "../types";

export interface GpContextType {
    surgeries: any[];
    setSurgeries: React.Dispatch<React.SetStateAction<IGpSurgery[]>>
}

export const GpContext = createContext<GpContextType>({
    surgeries: [],
    setSurgeries: (gp) => {}
});

export interface GpProviderProps {
    children: any;
}

export const GpProvider: FC<GpProviderProps> = ({ children }) => {

    const [surgeries, setSurgeries] = useState<IGpSurgery[]>([]);

    useEffect(() => {
        console.log(surgeries)
    }, [surgeries])

    return (
        <GpContext.Provider value={{ surgeries, setSurgeries  }}>
            { children }
        </GpContext.Provider>
    );
}