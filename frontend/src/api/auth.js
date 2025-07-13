export async function loginRequest({ username, password }) {
    console.log({ username, password });
    const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) throw new Error("Ошибка входа");

    return await res.json(); // → должен вернуть { username, is_admin }
}
