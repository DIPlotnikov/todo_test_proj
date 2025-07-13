import { useState } from "react";
import "./css/Filters.css";

/**
 * Компонент для фильтрации и сортировки задач
 */
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
        <form className="filters-form" onSubmit={handleSubmit}>
            <select 
                className="filter-select"
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)}
            >
                <option value="username">Имя</option>
                <option value="email">Email</option>
                <option value="is_completed">Статус</option>
            </select>

            <button 
                type="button" 
                className="order-btn"
                onClick={toggleOrder}
            >
                Порядок: {order === "asc" ? "↑" : "↓"}
            </button>

            <button 
                type="submit" 
                className="submit-btn"
            >
                Применить
            </button>
        </form>
    );
}