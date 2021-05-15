import { useState, useCallback } from 'react';

/**
 * This is to be used to determine if something is open or closed
 * and also holds set functions to toggle off and on the state.
 * @memberof Helpers
 * @param {boolean} defaultOpen default/start boolean value of this hook
 * @returns an object with the state and all functions available for it
 */
const useOpen = (defaultOpen) => {
    const [isOpen, setOpen] = useState(defaultOpen);
    return {
        isOpen,
        onOpen: useCallback(() => setOpen(true), []),
        onClose: useCallback(() => setOpen(false), []),
        onToggle: () => setOpen((prev) => !prev),
    };
};

export default useOpen;
