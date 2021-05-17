import { useState, useCallback } from 'react';

/**
 * This is used to determine if something is toggled or not
 * and also holds set functions to toggle off and on the state.
 * @memberof Helpers
 * @param {boolean} defaultToggle default/start boolean value of this hook
 * @returns an object with the state and all functions available for it
 */
const useToggle = (defaultToggle) => {
    const [isToggled, setToggle] = useState(defaultToggle);
    return {
        isToggled,
        onToggleTrue: useCallback(() => setToggle(true), []),
        onToggleFalse: useCallback(() => setToggle(false), []),
        onToggle: useCallback(() => setToggle((prev) => !prev), []),
    };
};

export default useToggle;
