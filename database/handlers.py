import math
from typing import Optional, List, Type

from sqlalchemy.orm import Session
from werkzeug.security import check_password_hash, generate_password_hash

from database.db import SessionLocal
from database.models import Task, User


class TaskHandlers:
    """
    Класс для работы с задачами
    """

    @staticmethod
    def get_tasks_page_data(db: Session,
                            page: int = 1,
                            per_page: int = 3,
                            sort_by: str = "id",
                            order: str = "asc") -> dict[str, List[Task] | int]:
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
        """
        Подсчет общего количества задач.

        :param db: сессия sqlalchemy
        :return: общее количество задач
        """
        return db.query(Task).count()

    @staticmethod
    def get_by_id(db: Session,
                  task_id: int) -> Optional[Task]:
        """
        Получение задачи по id.
        :param db: сессия sqlalchemy
        :param task_id: id задачи
        :return:
        """
        return db.query(Task).filter(Task.id == task_id).first()

    @staticmethod
    def create(db: Session,
               username: str,
               email: str,
               text: str) -> Task:
        """
        Создание задачи.
        :param db: сессия sqlalchemy
        :param username: имя пользователя
        :param email: email пользователя
        :param text: текст задачи
        :return: созданная задача
        """
        new_task = Task(username=username, email=email, text=text)
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task

    @staticmethod
    def update(db: Session,
               task_id: int,
               text: str = None,
               email: str= None,
               is_completed: bool = None) -> Optional[Task]:
        """
        Обновление задачи.
        :param db: сессия sqlalchemy
        :param task_id: id задачи
        :param text: текст задачи
        :param email: email пользователя
        :param is_completed: статус задачи
        :return: обновленная задача
        """

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
    def delete(db: Session,
               task_id: int) -> bool:
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            return False
        db.delete(task)
        db.commit()
        return True


class UserHandlers:
    """
    Класс для работы с пользователями
    """

    @staticmethod
    def verify_user(db: Session,
                    login: str,
                    password: str) -> bool:
        """
        Проверка пользователя
        :param db: сессия sqlalchemy
        :param login: логин пользователя
        :param password: пароль пользователя
        :return: True, если пользователь валиден, False в противном случае
        """
        user = db.query(User).filter(User.username == login).first()
        if not user:
            return False
        return check_password_hash(user.password, password)

    @staticmethod
    def get_by_username(db: Session,
                        username: str) -> Optional[User]:
        """
        Получение пользователя по username
        :param db: сессия sqlalchemy
        :param username: username пользователя
        :return: пользователь
        """
        return db.query(User).filter(User.username == username).first()

    @staticmethod
    def get_by_id(db: Session,
                  user_id: int) -> Optional[User]:
        """
        Получение пользователя по id
        :param db: сессия sqlalchemy
        :param user_id: id пользователя
        :return: пользователь
        """
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def create(db: Session,
               username: str,
               password: str,
               is_admin: bool = False) -> User:
        """
        Создание пользователя
        :param db: сессия sqlalchemy
        :param username: username пользователя
        :param password: пароль пользователя
        :param is_admin: является ли пользователь администратором
        :return: созданный пользователь
        """
        password_hash = generate_password_hash(password)
        new_user = User(username=username, password=password_hash, is_admin=is_admin)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
