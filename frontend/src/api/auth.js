export async function loginRequest({ username, password }) {
    const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
        const errorData = await res.json();
        const error = new Error(errorData.error || "Invalid credentials");
        error.response = res;
        throw error;
    }

    return res;
}