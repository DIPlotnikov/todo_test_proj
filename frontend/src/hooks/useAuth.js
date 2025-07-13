import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/userSlice";
import { loginRequest, checkAuth, logoutRequest } from "../api/auth";

/**
 * Хук для управления аутентификацией пользователей
 */
export const useAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleLogin = useCallback(async ({ username, password }) => {
        try {
            const res = await loginRequest({ username, password });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Invalid credentials");
            }

            const data = await res.json();
            dispatch(login({
                username: data.username,
                isAdmin: data.is_admin
            }));
            return { success: true };
        } catch (err) {
            return { success: false, error: err };
        }
    }, [dispatch]);

    const handleLogout = useCallback(async () => {
        try {
            await logoutRequest();
            dispatch(logout());
            return { success: true };
        } catch (err) {
            console.error("Ошибка при выходе:", err);
            dispatch(logout());
            return { success: true }; // Всё равно выходим
        }
    }, [dispatch]);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const data = await checkAuth();
                dispatch(login({ username: data.username, isAdmin: data.is_admin }));
            } catch {
                console.log("User is not authenticated");
            }
        };

        checkAuthStatus();
    }, [dispatch]);

    return {
        user,
        handleLogin,
        handleLogout
    };
}; 