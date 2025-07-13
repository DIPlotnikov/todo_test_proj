/**
 * Компонент таблицы для отображения задач
 */
const TaskTable = ({ tasks, onTaskClick }) => (
    <table>
        <thead>
            <tr>
                <th>Имя</th>
                <th>Email</th>
                <th>Текст</th>
                <th>Статус</th>
            </tr>
        </thead>
        <tbody>
            {tasks.map((task) => (
                <tr key={task.id} onClick={() => onTaskClick && onTaskClick(task)} style={{ cursor: "pointer" }}>
                    <td>{task.username}</td>
                    <td>{task.email}</td>
                    <td>{task.text}</td>
                    <td>{task.is_completed ? "✅" : "⏳"}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default TaskTable;