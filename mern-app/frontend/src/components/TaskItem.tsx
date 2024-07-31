import React from 'react';
import { Task } from '../utils/ITask';
import axios from 'axios';
import { API_URL } from '../api/api';

interface TaskItemProps {
    task: Task;
    fetchTasks: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, fetchTasks }) => {
    const deleteTask = async () => {
        try {
            await axios.delete(`${API_URL}/tasks/${task._id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const toggleComplete = async () => {
        try {
            await axios.put(`${API_URL}/tasks/${task._id}`, { ...task, completed: !task.completed });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div>
            <div className="card" style={{ width: "38rem"}}>
                <div className="card-body">
                    <h5 className="card-title" style={{ display: "inline-block" }}>{task.title}</h5>
                    {task.completed ? <span style={{ display: "inline-block", margin: "0px 0px 0px 10px", width: "20px", height: "8px", borderRadius: "20px", background: "green" }}> </span> :
                        <span style={{ display: "inline-block", margin: "0px 0px 0px 10px", width: "20px", height: "8px", borderRadius: "20px", background: "red" }}> </span>}
                    <p className="card-text">{task.description}</p>
                    <button className="btn btn-primary" onClick={toggleComplete}>Mark Complete</button>
                    <button className="btn btn-warning" onClick={deleteTask}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
