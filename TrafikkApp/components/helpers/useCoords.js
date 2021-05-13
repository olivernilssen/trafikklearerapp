import { useState, useCallback } from 'react';

/**
 * This function sets and gets coordinates
 * @namespace useCoords
 * @param {object} defaultToggle the default coords, usually undefined
 * @returns an object with the state and setState of these coordinates
 */
const useCoords = (defaultCoords) => {
    const [coords, setCoords] = useState(defaultCoords);
    return {
        coords,
        onUpdate: useCallback((newCoords) => setCoords(newCoords), []),
    };
};

export default useCoords;
