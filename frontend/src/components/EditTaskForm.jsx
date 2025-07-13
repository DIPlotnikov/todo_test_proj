import React, { useState } from "react";
import "./css/EditTaskForm.css";

const EditTaskForm = ({ task, onSave, onClose }) => {
    const [text, setText] = useState(task.text);
    const [isCompleted, setIsCompleted] = useState(task.is_completed);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedTask = {
            ...task,
            text,
            is_completed: isCompleted,
        };

        await onSave(updatedTask);
        onClose();
    };

    return (
        <div className="edit-task-overlay">
            <div className="edit-task-modal">
                <h3 className="edit-task-title">Редактировать задачу</h3>
                <form className="edit-task-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Текст задачи:</label>
                        <textarea
                            className="form-textarea"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            required
                        />
                    </div>
                    <div className="checkbox-group">
                        <input
                            className="checkbox-input"
                            type="checkbox"
                            id="completed"
                            checked={isCompleted}
                            onChange={(e) => setIsCompleted(e.target.checked)}
                        />
                        <label className="checkbox-label" htmlFor="completed">
                            Выполнено
                        </label>
                    </div>
                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskForm;