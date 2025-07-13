from math import ceil

from flask import Blueprint, request, jsonify, session
from sqlalchemy import asc, desc

from conf import TASK_PER_PAGE
from database.db import SessionLocal
from database.handlers import TaskHandlers
from database.models import Task
from routes.serializers import task_to_dict

def get_tasks():
    """
    Получение списка задач
    Метод GET
    Ожидаемые параметры:
    page - номер страницы (начиная с 1)
    sort_by - поле для сортировки (id, username, email, is_completed)
    """
    task_per_page = TASK_PER_PAGE
    db = SessionLocal()

    page = int(request.args.get('page', 1))
    sort_by = request.args.get('sort_by', 'id')
    order = request.args.get('order', 'asc')

    tasks_page_data = TaskHandlers.get_tasks_page_data(db=db, page=page, per_page=task_per_page, sort_by=sort_by,
                                                       order=order)
    result = {
        "tasks": [task_to_dict(t) for t in tasks_page_data.get("tasks")],
        "total_pages": tasks_page_data.get("total_pages"),
        "current_page": page,
        "total_tasks": tasks_page_data.get("total_tasks")
    }
    return jsonify(result), 200


def create_task():
    """
    Создание новой задачи
    Метод POST
    Ожидаемые параметры:
    username - имя пользователя
    email - email пользователя
    text - текст задачи
    """
    data = request.get_json()
    session_db = SessionLocal()
    new_task = TaskHandlers.create(
        db=session_db,
        username=data.get('username'),
        email=data.get('email'),
        text=data.get('text')
    )
    return jsonify(task_to_dict(new_task)), 201


def update_task(task_id):
    """
    Обновление задачи
    Метод PUT
    Ожидаемые параметры:
    email - email пользователя
    text - текст задачи
    is_completed - статус задачи
    """
    if not session.get('admin'):
        return jsonify({'error': 'Unauthorized'}), 403

    session_db = SessionLocal()
    task = session_db.query(Task).get(task_id)
    if not task:
        session_db.close()
        return jsonify({'error': 'Not found'}), 404

    data = request.get_json()
    updated_task = TaskHandlers.update(
        db=session_db,
        task_id=task_id,
        email=data.get('email'),
        text=data.get('text') + " *Редактировано администратором*",
        is_completed=data.get('is_completed')
    )
    session_db.close()

    return jsonify(task_to_dict(updated_task))

def delete_task(task_id):
    """
    Удаление задачи
    Метод DELETE
    Ожидаемые параметры:
    task_id - id задачи
    """
    if not session.get('admin'):
        return jsonify({'error': 'Unauthorized'}), 403

    session_db = SessionLocal()
    deleted = TaskHandlers.delete(db=session_db, task_id=task_id)
    if not deleted:
        session_db.close()
        return jsonify({'error': 'Not found'}), 404
    return jsonify({'message': 'Task deleted'}), 200
