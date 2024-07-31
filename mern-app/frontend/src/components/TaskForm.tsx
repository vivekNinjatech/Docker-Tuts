import React, { useState } from 'react';
import axios from 'axios';
import { Task } from '../utils/ITask';
import { API_URL } from '../api/api';

interface TaskFormProps {
    fetchTasks: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ fetchTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newTask: Task = {
            title,
            description,
            completed: false,
        };

        try {
            await axios.post(`${API_URL}/tasks`, newTask);
            fetchTasks();
            setTitle('');
            setDescription('');
            window.location.reload();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ marginLeft: '10px' }}
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
