import { useState, useCallback } from "react";
import { fetchTasks, addTask, updateTask } from "../api/tasks";

/**
 * Хук для управления задачами (загрузка, добавление, обновление, пагинация)
 */
export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortConfig, setSortConfig] = useState({
        field: "username",
        order: "asc"
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadTasks = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);

        try {
            const { tasks, total_pages } = await fetchTasks({
                page: params.page || currentPage,
                sort_by: params.field || sortConfig.field,
                order: params.order || sortConfig.order,
            });

            setTasks(tasks);
            setCurrentPage(params.page || currentPage);
            setTotalPages(total_pages);
        } catch (err) {
            setError("Ошибка загрузки задач");
            console.error("Ошибка загрузки задач:", err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, sortConfig]);

    const handleSearch = useCallback(
        ({ sort_by, order }) => {
            const newConfig = { field: sort_by, order };

            if (
                newConfig.field === sortConfig.field &&
                newConfig.order === sortConfig.order
            ) {
                return;
            }

            setSortConfig(newConfig);
            loadTasks({ page: currentPage, field: sort_by, order });
        },
        [sortConfig, loadTasks, currentPage]
    );

    const handleAddTask = useCallback(async (newTask) => {
        try {
            await addTask(newTask);
            loadTasks({ page: 1 });
            return { success: true };
        } catch (err) {
            console.error("Ошибка при добавлении задачи:", err);
            return { success: false, error: err };
        }
    }, [loadTasks]);

    const handleUpdateTask = useCallback(async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            loadTasks();
            return { success: true };
        } catch (err) {
            console.error("Ошибка при обновлении задачи:", err);
            return { success: false, error: err };
        }
    }, [loadTasks]);

    return {
        tasks,
        currentPage,
        totalPages,
        loading,
        error,
        loadTasks,
        handleSearch,
        handleAddTask,
        handleUpdateTask
    };
}; 