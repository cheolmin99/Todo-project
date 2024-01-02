import React, { useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

export default function TodoList({ filter }) {
    const [todos, setTodos] = useState([
        {id: '1', text: '공부하기', status: 'active'},
        {id: '2', text: '운동하기', status: 'active'}
    ]);
    const handleAdd = (todo) => setTodos([...todos, todo]);
    const handleUpdate = (updated) => setTodos(todos.map((todo) => (todo.id === updated.id ? updated : todo)));
    const handleDelete = (deleted) => setTodos(todos.filter((todo) => (todo.id !== deleted.id)));
    const filtered = getFilterChanger(todos, filter);
    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                {
                    filtered.map((item) => (
                        <Todo key={item.id} todo={item} onUpdate={handleUpdate} onDelete={handleDelete} />
                    ))
                }
            </ul>
            <AddTodo onAdd={handleAdd}/>
        </section>
    );
}

function getFilterChanger(todos, filter) {
    if(filter === 'all') {
        return todos;
    }
    return todos.filter((todo) => todo.status === filter);
}

