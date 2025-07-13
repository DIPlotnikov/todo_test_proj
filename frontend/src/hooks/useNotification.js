import { useState, useCallback } from "react";

/**
 * Хук для вывода уведомлений
 */
export const useNotification = () => {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    }, []);

    const clearNotification = useCallback(() => {
        setNotification(null);
    }, []);

    return {
        notification,
        showNotification,
        clearNotification
    };
}; 