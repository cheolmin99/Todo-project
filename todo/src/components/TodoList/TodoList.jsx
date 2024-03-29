import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

export default function TodoList({ filter }) {
    const [todos, setTodos] = useState(() => readTodosFromLocalStorage());
    const [search, setSearch] = useState('');
    const handleAdd = (todo) => setTodos([...todos, todo]);
    const handleUpdate = (updated) => setTodos(todos.map((todo) => (todo.id === updated.id ? updated : todo)));
    const handleDelete = (deleted) => setTodos(todos.filter((todo) => (todo.id !== deleted.id)));

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    },[todos]);

    const filtered = getFilterChanger(todos, filter);
    return (
        <section className={styles.container}>
            <input className={styles.search} type='text' placeholder='검색할 내용을 입력해 주세요.' value={search} onChange={(e) => setSearch(e.target.value)}/>
            <ul className={styles.list}>
                {
                    filtered
                        .filter((item) => item.text.toLowerCase().includes(search.toLowerCase()))
                        .map((item) => (
                        <Todo key={item.id} todo={item} onUpdate={handleUpdate} onDelete={handleDelete} />
                    ))
                }
            </ul>
            <AddTodo onAdd={handleAdd}/>
        </section>
    );
}

function readTodosFromLocalStorage() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

function getFilterChanger(todos, filter) {
    if(filter === 'all') {
        return todos;
    }
    return todos.filter((todo) => todo.status === filter);
}

