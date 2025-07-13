import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../components/Filters";
import TaskForm from "../components/TaskForm";
import LoginForm from "../components/LoginForm";
import TaskTable from "../components/TaskTable";
import EditTaskForm from "../components/EditTaskForm"; 
import { fetchTasks, addTask, updateTask } from "../api/tasks";
import { login, logout } from "../redux/userSlice";
import { loginRequest } from "../api/auth";

const TaskList = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("username");

    const [showForm, setShowForm] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [editingTask, setEditingTask] = useState(null); // ← новое состояние

    const loadTasks = async (params = {}) => {
        const { tasks, total_pages } = await fetchTasks({
            page: params.page || 1,
            sort_by: params.sort_by || sortBy,
            order: params.order || "asc",
        });
        setTasks(tasks);
        setCurrentPage(params.page || 1);
        setTotalPages(total_pages);
    };

    function handleSearch({ sort_by, order }) {
        setSortBy(sort_by);
        loadTasks({ page: 1, sort_by, order });
    }

    const handleAddTask = async (newTask) => {
        await addTask(newTask);
        setShowForm(false);
        loadTasks();
    };

    async function handleLogin({ username, password }) {
        try {
            const data = await loginRequest({ username, password });
            dispatch(login({ username: data.username, isAdmin: data.is_admin }));
            setShowLogin(false);
        } catch (e) {
            alert("Неверный логин или пароль");
        }
    }

    const handleSaveEditedTask = async (updatedTask) => {
        await updateTask(updatedTask);
        setEditingTask(null);
        loadTasks();
    };

    React.useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Список задач</h1>
                {user.isAuthenticated ? (
                    <div>
                        Привет, {user.username}! {user.isAdmin && "(админ) "}
                        <button onClick={() => dispatch(logout())}>Выйти</button>
                    </div>
                ) : (
                    <button onClick={() => setShowLogin(true)}>Войти</button>
                )}
            </div>

            {showLogin && <LoginForm onLogin={handleLogin} onClose={() => setShowLogin(false)} />}

            <Filters onSearch={handleSearch} />

            <TaskTable
                tasks={tasks}
                onTaskClick={(task) => {
                    if (user.isAdmin) setEditingTask(task); // ← редактирование
                }}
            />

            <div>
                Страница {currentPage} из {totalPages}
                <div>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button key={i} onClick={() => loadTasks({ page: i + 1, sort_by: sortBy })}>
                            {i + 1}
                        </button>
                    ))}
                </div>
                <button onClick={() => setShowForm(!showForm)}>Добавить задачу</button>
                {showForm && <TaskForm onSubmit={handleAddTask} onClose={() => setShowForm(false)} />}
                {editingTask && (
                    <EditTaskForm
                        task={editingTask}
                        onSave={handleSaveEditedTask}
                        onClose={() => setEditingTask(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default TaskList;
