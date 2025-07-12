from typing import Optional, List, Type

from sqlalchemy.orm import Session

from database.db import SessionLocal
from database.models import Task


class TaskHandlers:
    @staticmethod
    def get_all(db: Session, page: int = 1, per_page: int = 3, sort_by: str = "id", order: str = "asc") -> list[
        Type[Task]]:
        query = db.query(Task)
        if sort_by in ['username', 'email', 'is_completed']:
            column = getattr(Task, sort_by)
            if order == 'desc':
                query = query.order_by(column.desc())
            else:
                query = query.order_by(column.asc())

        return query.offset((page - 1) * per_page).limit(per_page).all()

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
    def update(db: Session, task_id: int, text: Optional[str] = None, is_completed: Optional[bool] = None) -> Optional[Task]:
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            return None

        if text is not None:
            task.text = text
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


if __name__ == "__main__":
    db_session = SessionLocal()
    TaskHandlers.create(db=db_session, username="x", email="x@x.com", text="hello")
    tasks = TaskHandlers.get_all(db=db_session, page=1, per_page=3, sort_by="username", order="asc")
    print(tasks)