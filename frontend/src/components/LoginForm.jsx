import { useState } from "react";

export default function LoginForm({ onLogin, onClose }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onLogin({ username, password });
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h3>Вход</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Логин:</label>
                        <input value={username} onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label>Пароль:</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div style={{ marginTop: "1rem" }}>
                        <button type="submit">Вход</button>
                        <button type="button" onClick={onClose} style={{ marginLeft: "1rem" }}>
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
    },
    modal: {
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        minWidth: "300px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        zIndex: 1001
    }
};
