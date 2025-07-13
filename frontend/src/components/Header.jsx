import React from "react";

/**
 * Компонент заголовка с информацией о пользователе
 */
const Header = ({ user, onLogin, onLogout }) => (
    <div className="header">
        <h1 className="title">Список задач</h1>
        {user.isAuthenticated ? (
            <div className="user-info">
                <span>Привет, {user.username}! {user.isAdmin && "(админ)"}</span>
                <button
                    onClick={onLogout}
                    className="button logout-button"
                >
                    Выйти
                </button>
            </div>
        ) : (
            <button
                onClick={onLogin}
                className="button login-button"
            >
                Войти
            </button>
        )}
    </div>
);

export default Header; 