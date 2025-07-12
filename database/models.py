from sqlalchemy import Column, Integer, String, Boolean

from database.db import Base


class Task(Base):
    """
    Модель для задач
    """
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(120), nullable=False, index=True)
    email = Column(String(120), nullable=False)
    text = Column(String(500), nullable=False)
    is_completed = Column(Boolean, default=False)

    def __repr__(self):
        return f"Task(username={self.username}, email={self.email}, text={self.text}, is_completed={self.is_completed})"


class User(Base):
    """
    Модель для пользователей, включая администраторов.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(120), nullable=False, index=True)
    password = Column(String(120), nullable=False)
    is_admin = Column(Boolean, default=False)
