import { useState } from "react";
import OrbitContext from "./OrbitContext";

export const OrbitProvider = ({ children }) => {
    const [isOrbitVisible, setIsOrbitVisible] = useState(true);

    
    return (
        <OrbitContext.Provider value={{ isOrbitVisible, setIsOrbitVisible }}>
            {children}
        </OrbitContext.Provider>
    );
};