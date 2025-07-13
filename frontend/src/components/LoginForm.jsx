import { useState } from "react";
import "./css/LoginForm.css";

export default function LoginForm({ onLogin, onClose }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await onLogin({ username, password });
        } catch (err) {
            setError("Неверный логин или пароль");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-overlay">
            <div className="login-modal">
                <h3 className="login-title">Вход в систему</h3>
                {error && <div className="error-message">{error}</div>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Логин:</label>
                        <input
                            className="form-input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Пароль:</label>
                        <input
                            className="form-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? "Вход..." : "Войти"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}