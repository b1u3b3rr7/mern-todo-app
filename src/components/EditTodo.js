import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditTodo(props) {
    const [inputs, setInputs] = useState({
        description: '',
        responsible: '',
        priority: '',
        completed: false
    });

    const { description, responsible, priority, completed } = inputs;

    useEffect(() => {
        axios.get('http://localhost:5000/todos/' + props.match.params.id)
            .then(res => {
                setInputs({
                    description: res.data.description,
                    responsible: res.data.responsible,
                    priority: res.data.priority,
                    completed: res.data.completed
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const onChangeCompleted = (e) => {
        setInputs({
            ...inputs,
            completed: !completed
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            description: description,
            responsible: responsible,
            priority: priority,
            completed: completed
        };
        axios.post('http://localhost:5000/todos/update/' + props.match.params.id, newTodo)
            .then(res => console.log(res.data));

        props.history.push('/');
    };

    return (
        <div>
            <h3 align="center">Update Todo</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={description}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Responsible: </label>
                    <input
                        type="text"
                        className="form-control"
                        name="responsible"
                        value={responsible}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="priority"
                            value="Low"
                            checked={priority === 'Low'}
                            onChange={onChange}
                        />
                        <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="priority"
                            value="Medium"
                            checked={priority === 'Medium'}
                            onChange={onChange}
                        />
                        <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="priority"
                            value="High"
                            checked={priority === 'High'}
                            onChange={onChange}
                        />
                        <label className="form-check-label">High</label>
                    </div>
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                        type="checkbox"
                        name="completed"
                        checked={completed}
                        value={completed}
                        onChange={onChangeCompleted}
                    />
                    <label className="form-check-label">
                        Completed
                    </label>
                </div>
                <br />
                <div className="form-group">
                    <input type="submit" value="Update Todo" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}

export default EditTodo;