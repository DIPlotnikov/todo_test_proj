import { useState } from "react";

export default function Filters({ onSearch }) {
    const [sortBy, setSortBy] = useState("username");
    const [order, setOrder] = useState("asc");

    function handleSubmit(e) {
        e.preventDefault();
        onSearch({ sort_by: sortBy, order });
    }

    function toggleOrder() {
        setOrder(prev => (prev === "asc" ? "desc" : "asc"));
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <label>Сортировать по:</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="username">Имя</option>
                <option value="email">Email</option>
                <option value="is_completed">Статус</option>
            </select>

            <button type="button" onClick={toggleOrder}>
                Порядок: {order === "asc" ? "↑" : "↓"}
            </button>

            <button type="submit">Найти</button>
        </form>
    );
}
