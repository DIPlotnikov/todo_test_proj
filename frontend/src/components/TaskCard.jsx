import React from "react";

/**
 * Компонент для отображения карточки задачи
 */
const TaskCard = ({ task, isAdmin, onEdit }) => (
    <div
        className="task-card"
        onClick={() => isAdmin && onEdit(task)}
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

export default TaskCard; 