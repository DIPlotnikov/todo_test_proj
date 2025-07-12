def task_to_dict(task):
    return {
        "id": task.id,
        "username": task.username,
        "email": task.email,
        "text": task.text,
        "is_completed": task.is_completed
    }
