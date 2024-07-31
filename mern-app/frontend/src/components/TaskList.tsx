import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { Task } from '../utils/ITask';
import { API_URL } from '../api/api';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);


    if(API_URL === undefined || API_URL === null) {
        throw new Error('API URL is not defined');
    }

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div style={{overflowY:"auto", height:"400px", width:""}}>
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
            ))}
        </div>
    );
};

export default TaskList;
