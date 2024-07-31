import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import axios from 'axios'
import { API_URL } from './api/api'

function App() {
  const [count, setCount] = useState(0)
  // to fetch counts of tasks

  const fetchTasks = async () => {
    try {
      const response: any = await axios.get(`${API_URL}/tasks`);
      console.log(response)
      setCount(response?.data?.length)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [])

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}



      <div>
        <h1 style={{ display: 'inline-block' }}>Task Manager</h1><span style={{ margin: "-20px 20px 20px 20px", display: 'inline-block', border: "2px solid yellow", borderRadius: "20px", padding: "5px" }}>{count}</span>
        <TaskForm fetchTasks={() => { }} />
        <TaskList />
      </div>
    </>
  )
}

export default App
