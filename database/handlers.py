import math
from typing import Optional, List, Type

from sqlalchemy.orm import Session

from database.db import SessionLocal
from database.models import Task


class TaskHandlers:
    @staticmethod
    def get_tasks_page_data(db: Session, page: int = 1, per_page: int = 3, sort_by: str = "id", order: str = "asc") \
            -> dict[str, list[Type[Task]] | int]:
        """
        Получение страницы задач.

        :param db: сессия sqlalchemy
        :param page: номер страницы (начиная с 1)
        :param per_page: количество задач на странице
        :param sort_by: поле для сортировки (id, username, email, is_completed)
        :param order: порядок сортировки (asc, desc)
        :return: словарь с задачами на странице, общим количеством задач и количеством страниц
        """

        query = db.query(Task)
        if sort_by in ['username', 'email', 'is_completed']:
            column = getattr(Task, sort_by)
            if order == 'desc':
                query = query.order_by(column.desc())
            else:
                query = query.order_by(column.asc())

        total_pages = math.ceil(query.count() / per_page)
        tasks = list(query.offset((page - 1) * per_page).limit(per_page).all())
        return {
            "tasks": tasks,
            "total_pages": total_pages,
            "total_tasks": query.count()
        }


    @staticmethod
    def count_all(db: Session) -> int:
        return db.query(Task).count()

    @staticmethod
    def get_by_id(db: Session, task_id: int) -> Optional[Task]:
        return db.query(Task).filter(Task.id == task_id).first()

    @staticmethod
    def create(db: Session, username: str, email: str, text: str) -> Task:
        new_task = Task(username=username, email=email, text=text)
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task

    @staticmethod
    def update(db: Session, task_id: int, text: Optional[str] = None, email: Optional[str] = None, is_completed: Optional[bool] = None) -> Optional[Task]:
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            return None

        if text is not None:
            task.text = text
        if email is not None:
            task.email = email
        if is_completed is not None:
            task.is_completed = is_completed

        db.commit()
        db.refresh(task)
        return task

    @staticmethod
    def delete(db: Session, task_id: int) -> bool:
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            return False
        db.delete(task)
        db.commit()
        return True

