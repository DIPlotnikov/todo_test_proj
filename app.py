import os

from flask import Flask, send_from_directory

from routes.auth_routes import login, logout, me
from routes.task_routes import get_tasks, create_task, update_task, delete_task

app = Flask(__name__, static_folder="frontend/build", static_url_path="/")
app.secret_key = os.urandom(24)


# Маршруты для задач
app.add_url_rule("/tasks", view_func=get_tasks, methods=["GET"])
app.add_url_rule("/tasks/create", view_func=create_task, methods=["POST"])
app.add_url_rule("/tasks/update/<int:task_id>", view_func=update_task, methods=["PUT"])
app.add_url_rule("/tasks/delete/<int:task_id>", view_func=delete_task, methods=["DELETE"])

# Маршруты для аутентификации
app.add_url_rule("/auth/login", view_func=login, methods=["POST"])
app.add_url_rule("/auth/logout", view_func=logout, methods=["POST"])
app.add_url_rule("/auth/me", view_func=me, methods=["GET"])

# Маршруты для React
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
