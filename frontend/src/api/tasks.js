const API_URL = "/tasks";

/**
 * Функция для загрузки списка задач с пагинацией и сортировкой
 */
export async function fetchTasks({ page = 1, sort_by = "id", order = "asc" }) {
    const url = new URL(API_URL, window.location.origin);
    url.searchParams.append("page", page);
    url.searchParams.append("sort_by", sort_by);
    url.searchParams.append("order", order);

    const res = await fetch(url);
    if (!res.ok) throw new Error("Ошибка загрузки задач");
    return await res.json();
}

/**
 * Функция для добавления новой задачи
 */
export async function addTask({ username, email, text }) {
    const res = await fetch("/tasks/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, text })
    });

    if (!res.ok) throw new Error("Ошибка при добавлении задачи");
    return await res.json();
}

/**
 * Функция для обновления существующей задачи
 */
export async function updateTask(task) {
    const res = await fetch(`/tasks/update/${task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: task.username,
            email: task.email,
            text: task.text,
            is_completed: task.is_completed,
        }),
    });

    if (!res.ok) {
        throw new Error("Ошибка при обновлении задачи");
    }

    return await res.json();
}
