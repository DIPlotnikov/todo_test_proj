import React, { useState, useEffect } from "react";
import Filters from "../components/Filters";
import TaskForm from "../components/TaskForm";
import LoginForm from "../components/LoginForm";
import EditTaskForm from "../components/EditTaskForm";
import Header from "../components/Header";
import TaskListContent from "../components/TaskListContent";
import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import "./css/TaskList.css";

/**
 * Основной компонент для отображения списка задач
 */
const TaskList = () => {
    const { user, handleLogin, handleLogout } = useAuth();
    const { 
        tasks, 
        currentPage, 
        totalPages, 
        loading, 
        error, 
        loadTasks, 
        handleSearch, 
        handleAddTask, 
        handleUpdateTask 
    } = useTasks();
    const { notification, showNotification } = useNotification();

    const [showForm, setShowForm] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Обработчики событий
    const onAddTask = async (newTask) => {
        const result = await handleAddTask(newTask);
        if (result.success) {
            setShowForm(false);
            showNotification("Задача успешно добавлена!");
        }
    };

    const onEditTask = (task) => {
        setEditingTask(task);
    };

    const onSaveEditedTask = async (updatedTask) => {
        const result = await handleUpdateTask(updatedTask);
        if (result.success) {
            setEditingTask(null);
        } else {
            showNotification("Ошибка при обновлении задачи. Авторизуйтесь и попробуйте ещё раз.");
        }
    };

    const onLogin = async (credentials) => {
        const result = await handleLogin(credentials);
        if (result.success) {
            setShowLogin(false);
        } else {
            throw result.error;
        }
    };

    const onLogout = async () => {
        await handleLogout();
    };

    const onPageChange = (page) => {
        loadTasks({ page });
    };

    // Первичная загрузка задач
    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div className="container">
            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}

            <Header 
                user={user}
                onLogin={() => setShowLogin(true)}
                onLogout={onLogout}
            />

            {showLogin && (
                <LoginForm 
                    onLogin={onLogin} 
                    onClose={() => setShowLogin(false)} 
                />
            )}

            <Filters onSearch={handleSearch} />

            <TaskListContent
                tasks={tasks}
                currentPage={currentPage}
                totalPages={totalPages}
                loading={loading}
                error={error}
                user={user}
                onPageChange={onPageChange}
                onEditTask={onEditTask}
                onAddTask={() => setShowForm(true)}
            />

            {showForm && (
                <TaskForm
                    onSubmit={onAddTask}
                    onClose={() => setShowForm(false)}
                />
            )}

            {editingTask && (
                <EditTaskForm
                    task={editingTask}
                    onSave={onSaveEditedTask}
                    onClose={() => setEditingTask(null)}
                />
            )}
        </div>
    );
};

export default TaskList;