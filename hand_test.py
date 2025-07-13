from database.db import SessionLocal
from database.handlers import TaskHandlers, UserHandlers
from database.models import Task


def create_task():
    from string import ascii_uppercase
    db_session = SessionLocal()

    # Очистим таблицу задач перед генерацией
    db_session.query(Task).delete()
    db_session.commit()

    # Генерируем 10 задач: A, B, C... J
    for i, letter in enumerate(reversed(ascii_uppercase[:10])):  # A-J
        TaskHandlers.create(
            db=db_session,
            username=letter,
            email=f"{letter.lower()}@x.com",
            text=f"task {letter}"
        )
        # Отмечаем каждую вторую задачу как выполненную
        if i % 2 == 0:
            task = db_session.query(Task).filter_by(username=letter).first()
            task.is_completed = True
    db_session.commit()

    print("==> Все задачи:")
    tasks = TaskHandlers.get_tasks_page_data(
        db=db_session,
        page=1,
        per_page=10,
        sort_by="username",
        order="asc"
    )["tasks"]

    for t in tasks:
        print(f"{t.username} | {t.email} | {t.text} | done={t.is_completed}")


def create_users():
    db_session = SessionLocal()
    UserHandlers.create(db=db_session, username="admin", password="123", is_admin=True)
    verified = UserHandlers.verify_user(db_session, "admin", "123")
    print(f"admin verified: {verified}")

if __name__ == "__main__":
    create_users()
