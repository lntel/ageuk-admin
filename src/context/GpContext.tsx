import React, { createContext, FC, useEffect, useState } from "react";
import { IGpSurgery } from "../types";

export interface GpContextType {
    surgeries: IGpSurgery[];
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

    return (
        <GpContext.Provider value={{ surgeries, setSurgeries  }}>
            { children }
        </GpContext.Provider>
    );
}