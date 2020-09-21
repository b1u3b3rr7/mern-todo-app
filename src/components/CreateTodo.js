import React, { useState } from 'react';
import axios from 'axios';

function CreateTodo() {
    const [inputs, setInputs] = useState({
        description: '',
        responsible: '',
        priority: '',
        completed: false
    });

    const { description, responsible, priority, completed } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(`Form submitted:`);
        console.log(`Description: ${description}`);
        console.log(`Responsible: ${responsible}`);
        console.log(`Priority: ${priority}`);

        const newTodo = {
            description: description,
            responsible: responsible,
            priority: priority,
            completed: completed
        };

        axios.post('http://localhost:5000/todos/add', newTodo)
            .then(res => console.log(res.data));

        setInputs({
            description: '',
            responsible: '',
            priority: '',
            completed: false
        });
    };

    return (
        <div style={{ marginTop: 10 }}>
            <h3>Create New Todo</h3>
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
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priority"
                            value="Low"
                            checked={priority === 'Low'}
                            onChange={onChange}
                        />
                        <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priority"
                            value="Medium"
                            checked={priority === 'Medium'}
                            onChange={onChange}
                        />
                        <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priority"
                            value="High"
                            checked={priority === 'High'}
                            onChange={onChange}
                        />
                        <label className="form-check-label">Low</label>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Todo" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}

export default CreateTodo;