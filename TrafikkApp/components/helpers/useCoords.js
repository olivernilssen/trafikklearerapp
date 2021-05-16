import { useState, useCallback } from 'react';

/**
 * This function sets and gets coordinates
 * @memberof Helpers
 * @param {object} defaultToggle the default coords, usually undefined
 * @returns An object with the state and setState of these coordinates
 */
const useCoords = (defaultCoords) => {
    // if (
    //     !defaultCoords.name ||
    //     !defaultCoords.longitude ||
    //     !defaultCoords.longitude
    // ) {
    //     console.error(
    //         'You need to use name, longitude and latidude in this structure'
    //     );
    // }
    const [coords, setCoords] = useState(defaultCoords);
    return {
        coords,
        onUpdate: useCallback((newCoords) => setCoords(newCoords), []),
    };
};

export default useCoords;
