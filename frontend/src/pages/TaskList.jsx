import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../components/Filters";
import TaskForm from "../components/TaskForm";
import LoginForm from "../components/LoginForm";
import EditTaskForm from "../components/EditTaskForm";
import { fetchTasks, addTask, updateTask } from "../api/tasks";
import { login, logout } from "../redux/userSlice";
import { loginRequest } from "../api/auth";
import "./css/TaskList.css"; // Импорт CSS файла

const TaskList = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortConfig, setSortConfig] = useState({ 
        field: "username", 
        order: "asc" 
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

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

    const handleSearch = useCallback(({ sort_by, order }) => {
        setSortConfig({ field: sort_by, order });
        loadTasks({ page: 1, field: sort_by, order });
    }, [loadTasks]);

    const handleAddTask = useCallback(async (newTask) => {
        try {
            await addTask(newTask);
            setShowForm(false);
            loadTasks({ page: 1 });
        } catch (err) {
            console.error("Ошибка при добавлении задачи:", err);
        }
    }, [loadTasks]);

    const handleLogin = useCallback(async ({ username, password }) => {
        try {
            const data = await loginRequest({ username, password });
            dispatch(login({ username: data.username, isAdmin: data.is_admin }));
            setShowLogin(false);
        } catch (err) {
            console.error("Ошибка авторизации:", err);
        }
    }, [dispatch]);

    const handleSaveEditedTask = useCallback(async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            setEditingTask(null);
            loadTasks();
        } catch (err) {
            console.error("Ошибка при обновлении задачи:", err);
        }
    }, [loadTasks]);

    const handleLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const Pagination = () => {
        if (totalPages <= 1) return null;

        const pageButtons = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => loadTasks({ page: i })}
                    className={`page-btn ${currentPage === i ? 'active' : ''}`}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="pagination">
                {currentPage > 1 && (
                    <button 
                        onClick={() => loadTasks({ page: 1 })}
                        className="nav-btn"
                    >
                        «
                    </button>
                )}
                {startPage > 1 && <span>...</span>}
                {pageButtons}
                {endPage < totalPages && <span>...</span>}
                {currentPage < totalPages && (
                    <button 
                        onClick={() => loadTasks({ page: totalPages })}
                        className="nav-btn"
                    >
                        »
                    </button>
                )}
            </div>
        );
    };

    const TaskCard = ({ task }) => (
        <div 
            className="task-card"
            onClick={() => user.isAdmin && setEditingTask(task)}
        >
            <div className="task-field">
                <strong>Имя:</strong> {task.username}
            </div>
            <div className="task-field">
                <strong>Email:</strong> {task.email}
            </div>
            <div className="task-field task-text">
                <strong>Текст:</strong> {task.text}
            </div>
            <div className="task-field">
                <strong>Статус:</strong> 
                {task.is_completed ? "✅ Выполнено" : "⏳ В процессе"}
            </div>
        </div>
    );

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Список задач</h1>
                {user.isAuthenticated ? (
                    <div className="user-info">
                        <span>Привет, {user.username}! {user.isAdmin && "(админ)"}</span>
                        <button 
                            onClick={handleLogout}
                            className="button logout-button"
                        >
                            Выйти
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setShowLogin(true)}
                        className="button login-button"
                    >
                        Войти
                    </button>
                )}
            </div>

            {showLogin && <LoginForm onLogin={handleLogin} onClose={() => setShowLogin(false)} />}

            <Filters onSearch={handleSearch} />

            {loading ? (
                <div className="loading">Загрузка...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <>
                    <div className="tasks-container">
                        {tasks.map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>

                    <div className="pagination-container">
                        <div className="page-info">
                            Страница {currentPage} из {totalPages}
                        </div>
                        <Pagination />
                        
                        <button 
                            onClick={() => setShowForm(true)}
                            className="button add-button"
                        >
                            Добавить задачу
                        </button>
                    </div>
                </>
            )}

            {showForm && (
                <TaskForm 
                    onSubmit={handleAddTask} 
                    onClose={() => setShowForm(false)} 
                />
            )}
            
            {editingTask && (
                <EditTaskForm
                    task={editingTask}
                    onSave={handleSaveEditedTask}
                    onClose={() => setEditingTask(null)}
                />
            )}
        </div>
    );
};

export default TaskList;