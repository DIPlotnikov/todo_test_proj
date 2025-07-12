from database.handlers import TaskHandlers


def test_create_task(db_session):
    task = TaskHandlers.create(
        db=db_session,
        username="john",
        email="john@example.com",
        text="Test task"
    )
    assert task.id is not None
    assert task.username == "john"
    assert task.email == "john@example.com"
    assert task.text == "Test task"
    assert task.is_completed is False


def test_get_all_tasks(db_session):
    # Подготовка
    for i in range(5):
        TaskHandlers.create(db=db_session, username=f"user{i}", email=f"user{i}@x.com", text=f"text{i}")

    tasks = TaskHandlers.get_all(db=db_session, page=1, per_page=3, sort_by="username", order="asc")
    assert len(tasks) == 3
    assert tasks[0].username == "user0"

    tasks_page_2 = TaskHandlers.get_all(db=db_session, page=2, per_page=3)
    assert len(tasks_page_2) == 2


def test_count_all_tasks(db_session):
    assert TaskHandlers.count_all(db=db_session) == 0
    TaskHandlers.create(db=db_session, username="a", email="a@x.com", text="x")
    assert TaskHandlers.count_all(db=db_session) == 1


def test_get_by_id(db_session):
    task = TaskHandlers.create(db=db_session, username="x", email="x@x.com", text="hello")
    fetched = TaskHandlers.get_by_id(db=db_session, task_id=task.id)
    assert fetched is not None
    assert fetched.id == task.id

    not_found = TaskHandlers.get_by_id(db=db_session, task_id=999)
    assert not_found is None


def test_update_task(db_session):
    task = TaskHandlers.create(db=db_session, username="user", email="u@x.com", text="before")
    updated = TaskHandlers.update(db=db_session, task_id=task.id, text="after", is_completed=True)

    assert updated.text == "after"
    assert updated.is_completed is True


def test_delete_task(db_session):
    task = TaskHandlers.create(db=db_session, username="del", email="d@x.com", text="to delete")
    success = TaskHandlers.delete(db=db_session, task_id=task.id)
    assert success is True

    should_be_none = TaskHandlers.get_by_id(db=db_session, task_id=task.id)
    assert should_be_none is None

    fail = TaskHandlers.delete(db=db_session, task_id=999)
    assert fail is False
