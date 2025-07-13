import React from "react";
import TaskCard from "./TaskCard";
import Pagination from "./Pagination";

/**
 * Компонент для отображения основного содержимого списка задач
 */
const TaskListContent = ({ 
    tasks, 
    currentPage, 
    totalPages, 
    loading, 
    error, 
    user, 
    onPageChange, 
    onEditTask, 
    onAddTask 
}) => {
    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <>
            <div className="tasks-container">
                {tasks.map(task => (
                    <TaskCard 
                        key={task.id} 
                        task={task} 
                        isAdmin={user.isAdmin}
                        onEdit={onEditTask}
                    />
                ))}
            </div>

            <div className="pagination-container">
                <div className="page-info">
                    Страница {currentPage} из {totalPages}
                </div>
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />

                <button
                    onClick={onAddTask}
                    className="button add-button"
                >
                    Добавить задачу
                </button>
            </div>
        </>
    );
};

export default TaskListContent; 