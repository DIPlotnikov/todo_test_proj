from flask import Flask
from routes.task_routes import get_tasks, create_task, update_task, delete_task

app = Flask(__name__)


# Маршруты для задач
app.add_url_rule("/tasks", view_func=get_tasks, methods=["GET"])
app.add_url_rule("/tasks/create", view_func=create_task, methods=["POST"])
app.add_url_rule("/tasks/update/<int:task_id>", view_func=update_task, methods=["PUT"])
app.add_url_rule("/tasks/delete/<int:task_id>", view_func=delete_task, methods=["DELETE"])

# Маршруты для аутентификации



if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
