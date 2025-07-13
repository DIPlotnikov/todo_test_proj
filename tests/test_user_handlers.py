
from database.handlers import UserHandlers


def test_create_user(db_session):
    user = UserHandlers.create(db=db_session, username="testuser", password="secret", is_admin=True)

    assert user.id is not None
    assert user.username == "testuser"
    assert user.is_admin is True
    assert user.password != "secret"  # должен быть хэш


def test_verify_user_success(db_session):
    UserHandlers.create(db=db_session, username="tester", password="12345")
    is_valid = UserHandlers.verify_user(db=db_session, login="tester", password="12345")

    assert is_valid is True


def test_verify_user_invalid_password(db_session):
    UserHandlers.create(db=db_session, username="tester2", password="abc123")
    is_valid = UserHandlers.verify_user(db=db_session, login="tester2", password="wrong")

    assert is_valid is False


def test_verify_user_not_found(db_session):
    is_valid = UserHandlers.verify_user(db=db_session, login="ghost", password="any")

    assert is_valid is False


def test_get_by_username(db_session):
    created = UserHandlers.create(db=db_session, username="alice", password="pw")
    fetched = UserHandlers.get_by_username(db=db_session, username="alice")

    assert fetched.id == created.id
    assert fetched.username == "alice"


def test_get_by_id(db_session):
    created = UserHandlers.create(db=db_session, username="bob", password="pw")
    fetched = UserHandlers.get_by_id(db=db_session, user_id=created.id)

    assert fetched.username == "bob"
