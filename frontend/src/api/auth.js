/**
 * Функция для отправки запроса на вход в систему
 */
export async function loginRequest({ username, password }) {
    const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
    });

    if (!res.ok) {
        const errorData = await res.json();
        const error = new Error(errorData.error || "Invalid credentials");
        error.response = res;
        throw error;
    }

    return res;
}

/**
 * Функция для проверки статуса аутентификации пользователя
 */
export async function checkAuth() {
    const res = await fetch("/auth/check", {
        credentials: 'include' 
    });
    
    if (!res.ok) {
        throw new Error("Not authenticated");
    }
    
    return await res.json();
}

/**
 * Функция для выхода из системы
 */
export async function logoutRequest() {
    const res = await fetch("/auth/logout", {
        method: "POST",
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error("Logout failed");
    }
    
    return res;
}