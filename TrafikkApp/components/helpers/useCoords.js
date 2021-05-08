import { useState, useCallback } from 'react';

export const useCoords = (defaultToggle) => {
    const [coords, setCoords] = useState(defaultToggle);
    return {
        coords,
        onUpdate: useCallback((newCoords) => setCoords(newCoords), []),
    };
};
