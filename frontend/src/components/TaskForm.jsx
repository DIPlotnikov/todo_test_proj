import { useState } from "react";
import "./css/TaskForm.css";

/**
 * Компонент формы для добавления новой задачи
 */
export default function TaskForm({ onSubmit, onClose }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({ username, email, text });
    }

    return (
        <div className="task-form-overlay">
            <div className="task-form-modal">
                <h3 className="task-form-title">Новая задача</h3>
                <form className="task-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Имя:</label>
                        <input
                            className="form-input"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email:</label>
                        <input
                            className="form-input"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Текст задачи:</label>
                        <textarea
                            className="form-textarea"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            required
                        />
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
                            Добавить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}