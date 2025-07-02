'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type R3FContextType = {
    showControls: boolean;
    setShowControls: Dispatch<SetStateAction<boolean>>;
    showGridHelper: boolean;
    setShowGridHelper: Dispatch<SetStateAction<boolean>>;
    showAxesHelper: boolean;
    setShowAxesHelper: Dispatch<SetStateAction<boolean>>;
    shouldType: boolean;
    setShouldType: Dispatch<SetStateAction<boolean>>;
    showCanvas: boolean;
    setShowCanvas: Dispatch<SetStateAction<boolean>>;
};

const R3FContext = createContext<R3FContextType | undefined>(undefined);

export function useR3F() {
    const context = useContext(R3FContext);

    if (!context) {
        throw new Error('useR3F must be used within a R3FProvider');
    }

    return context;
}

export function R3FProvider({ children }: { children: ReactNode }) {
    const [showControls, setShowControls] = useState<boolean>(false);
    const [showGridHelper, setShowGridHelper] = useState<boolean>(false);
    const [showAxesHelper, setShowAxesHelper] = useState<boolean>(false);
    const [shouldType, setShouldType] = useState<boolean>(false);
    const [showCanvas, setShowCanvas] = useState<boolean>(false);

    return (
        <R3FContext.Provider
            value={{
                showControls,
                setShowControls,
                showGridHelper,
                setShowGridHelper,
                showAxesHelper,
                setShowAxesHelper,
                shouldType,
                setShouldType,
                showCanvas,
                setShowCanvas,
            }}
        >
            {children}
        </R3FContext.Provider>
    );
}
