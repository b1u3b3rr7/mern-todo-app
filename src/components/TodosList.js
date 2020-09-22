import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Todo(props) {
    const { _id, description, responsible, priority, completed } = props.todo;
    return (
        <tr>
            <td className={completed ? 'completed' : null}>{description}</td>
            <td className={completed ? 'completed' : null}>{responsible}</td>
            <td className={completed ? 'completed' : null}>{priority}</td>
            <td>
                <Link to={'/edit/' + _id}>Edit</Link>
            </td>
        </tr>
    );
}

function TodosList() {
    const [todos, setTodos] = useState([]);
    console.log("Component appeared.");
    useEffect(() => {
        axios.get('http://localhost:5000/todos/')
            .then(response => {
                setTodos(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        return () => {
            console.log("Component disappeared.");
        }
    }, []);
    
    return (
        <div>
            <h3>Todos List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <Todo todo={todo} key={todo._id}></Todo>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TodosList;