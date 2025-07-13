from flask import Blueprint, request, jsonify, session

from database.db import SessionLocal
from database.handlers import UserHandlers


def login():
    """
    Аутентификация
    Ожидаемые данные:
    {
        "username": "username",
        "password": "password"
    }
    Ответ:
    {
        "message": "Logged in"
    } - при успешной аутентификации

    """
    db_session = SessionLocal()
    data = request.get_json()

    login = data['username']
    password = str(data['password'])

    if UserHandlers.verify_user(db_session, login, password):
        user = UserHandlers.get_by_username(db_session, login)

        session['admin'] = user.is_admin
        session['is_authenticated'] = True
        session['user_id'] = user.id

        return jsonify({'message': 'Logged in'}), 200

    return jsonify({'error': 'Invalid credentials'}), 401


def logout():
    """
    Деаутентификация
    """
    session.pop('admin', None)
    return jsonify({'message': 'Logged out'})


def me():
    """
    Получение данных о текущем пользователе
    возвращает:
    {
        "username": "username",
        "is_admin": true
    }
    """
    if session.get('is_authenticated') is None or not session.get('is_authenticated'):
        return jsonify({'error': 'Unauthorized'}), 403

    user_id = session.get('user_id')
    db_session = SessionLocal()
    user_data = UserHandlers.get_by_id(db=db_session, user_id=int(user_id))
    return {
        'username': user_data.username,
        'is_admin': user_data.is_admin
    }
