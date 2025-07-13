# 📋 Todo Task Manager

Современное веб-приложение для управления задачами с полнофункциональным фронтендом на React и бэкендом на Flask.

## 🚀 Возможности

### Для всех пользователей:
- ✅ **Просмотр задач** с пагинацией и сортировкой
- ✅ **Добавление новых задач** с валидацией
- ✅ **Фильтрация и сортировка** по имени, email и статусу
- ✅ **Адаптивный дизайн** для всех устройств

### Для администраторов:
- 🔐 **Аутентификация** с ролевой системой
- ✏️ **Редактирование задач** (текст и статус)
- 📊 **Полный контроль** над всеми задачами

## 🏗️ Архитектура

### Backend (Flask + SQLAlchemy)
```
├── app.py                 # Главный файл приложения
├── database/
│   ├── db.py             # Настройки базы данных
│   ├── models.py         # Модели данных (Task, User)
│   └── handlers.py       # Обработчики БД
├── routes/
│   ├── auth_routes.py    # Маршруты аутентификации
│   ├── task_routes.py    # Маршруты задач
│   └── serializers.py    # Сериализация данных
└── migrations/           # Миграции базы данных
```

### Frontend (React + Redux)
```
├── src/
│   ├── components/       # React компоненты
│   │   ├── TaskCard.jsx      # Карточка задачи
│   │   ├── TaskForm.jsx      # Форма добавления
│   │   ├── EditTaskForm.jsx  # Форма редактирования
│   │   ├── LoginForm.jsx     # Форма входа
│   │   ├── Filters.jsx       # Фильтры и сортировка
│   │   ├── Pagination.jsx    # Пагинация
│   │   ├── Header.jsx        # Заголовок с пользователем
│   │   └── TaskListContent.jsx # Основной контент
│   ├── hooks/            # Кастомные React хуки
│   │   ├── useTasks.js       # Управление задачами
│   │   ├── useAuth.js        # Управление аутентификацией
│   │   └── useNotification.js # Уведомления
│   ├── api/              # API клиент
│   │   ├── tasks.js          # API задач
│   │   └── auth.js           # API аутентификации
│   ├── redux/            # Управление состоянием
│   │   ├── store.js          # Redux store
│   │   └── userSlice.js      # Слайс пользователя
│   └── utils/            # Утилиты
│       └── logger.js         # Логирование
```

## 🛠️ Технологии

### Backend:
- **Flask 3.1.1** - веб-фреймворк
- **SQLAlchemy 2.0.41** - ORM
- **Alembic 1.16.4** - миграции БД
- **Flask-CORS** - CORS поддержка
- **SQLite** - база данных

### Frontend:
- **React 18.2.0** - UI библиотека
- **Redux Toolkit 2.8.2** - управление состоянием
- **React Router** - маршрутизация
- **CSS3** - стилизация
- **Fetch API** - HTTP запросы

## 📦 Установка и запуск

### Предварительные требования:
- Python 3.8+
- Node.js 16+
- npm или yarn

### 1. Клонирование репозитория:
```bash
git clone https://github.com/DIPlotnikov/todo_test_proj
cd todo_test_proj
```

### 2. Настройка Backend:
```bash
# Создание виртуального окружения
python -m venv venv

# Активация (Windows)
venv\Scripts\activate

# Активация (Linux/Mac)
source venv/bin/activate

# Установка зависимостей
pip install -r requirements.txt

# Инициализация базы данных
alembic upgrade head

# Запуск сервера
python app.py
```

### 3. Настройка Frontend:
```bash
# Переход в папку frontend
cd frontend

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start
```

### 4. Доступ к приложению:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔧 Конфигурация

### Переменные окружения:
```bash
# Flask
FLASK_ENV=development
FLASK_DEBUG=True

# База данных
DATABASE_URL=sqlite:///database.sqlite3
```

### Настройка администратора:
```python
# В Python консоли или скрипте
from database.db import SessionLocal
from database.models import User
import hashlib

db = SessionLocal()
admin = User(
    username="admin",
    password=hashlib.md5("admin123".encode()).hexdigest(),
    is_admin=True
)
db.add(admin)
db.commit()
```

## 📡 API Endpoints

### Задачи:
- `GET /tasks` - получение списка задач с пагинацией
- `POST /tasks/create` - создание новой задачи
- `PUT /tasks/update/<id>` - обновление задачи
- `DELETE /tasks/delete/<id>` - удаление задачи

### Аутентификация:
- `POST /auth/login` - вход в систему
- `POST /auth/logout` - выход из системы
- `GET /auth/check` - проверка статуса аутентификации
- `GET /auth/me` - информация о текущем пользователе

## 🎨 Особенности UI/UX

- **Адаптивный дизайн** - работает на всех устройствах
- **Анимации** - плавные переходы и уведомления
- **Интуитивные формы** - валидация в реальном времени
- **Пагинация** - эффективная навигация по большим спискам
- **Сортировка** - по имени, email и статусу
- **Уведомления** - обратная связь для пользователя

## 🔒 Безопасность

- **Сессии** - безопасное хранение состояния пользователя
- **Валидация** - проверка данных на клиенте и сервере
- **CORS** - настройка для безопасных кросс-доменных запросов
- **Ролевая система** - разделение прав доступа

## 🧪 Тестирование

### Backend тесты:
```bash
# Запуск тестов
python -m pytest tests/
```
## 🚀 Развертывание

### Production сборка:
```bash
# Frontend
cd frontend
npm run build

# Backend
python app.py
```

### Docker (опционально):
```dockerfile
# Dockerfile для полного стека
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

## 📝 Лицензия

MIT License - см. файл LICENSE для деталей.

## 👥 Авторы

- Разработчик: [Ваше имя]
- Версия: 1.0.0
- Дата: 2024

## 🆘 Поддержка

При возникновении проблем:
1. Проверьте Issues в репозитории
2. Создайте новый Issue с описанием проблемы
3. Укажите версии Python, Node.js и операционную систему

---

⭐ Если проект вам понравился, поставьте звездочку!