import { useState, useCallback } from 'react';

export const useOpen = (defaultOpen) => {
    const [isOpen, setOpen] = useState(defaultOpen);
    return {
        isOpen,
        onOpen: useCallback(() => setOpen(true), []),
        onClose: useCallback(() => setOpen(false), []),
        onToggle: useCallback(() => setOpen((prev) => !prev), []),
    };
};
