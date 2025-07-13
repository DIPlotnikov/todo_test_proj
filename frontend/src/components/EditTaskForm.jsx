import React, { useState } from "react";

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
        <div style={{
            position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            background: "white", padding: "20px", border: "1px solid black", zIndex: 1000
        }}>
            <h3>Редактировать задачу</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Текст задачи:</label><br />
                    <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} />
                </div>
                <div>
                    <label>
                        <input type="checkbox" checked={isCompleted} onChange={(e) => setIsCompleted(e.target.checked)} />
                        Выполнено
                    </label>
                </div>
                <div style={{ marginTop: 10 }}>
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={onClose}>Отмена</button>
                </div>
            </form>
        </div>
    );
};

export default EditTaskForm;
