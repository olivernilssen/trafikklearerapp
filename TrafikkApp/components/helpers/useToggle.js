import { useState, useCallback } from 'react';

export const useToggle = (defaultToggle) => {
    const [isToggled, setToggle] = useState(defaultToggle);
    return {
        isToggled,
        onToggleTrue: useCallback(() => setToggle(true), []),
        onToggleFalse: useCallback(() => setToggle(false), []),
        onToggle: useCallback(() => setToggle((prev) => !prev), []),
    };
};
