// this is the page that the create task and lists will appear

import Navbar from '../components/Navbar';

import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/api/tasks', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(response.data);
      } catch (error) {
        alert('Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, [user]);

  return (
    <>
      <Navbar />
      {/* <div className="container mx-auto p-6"> */}
      <div className="flex gap-6">
        <div className="w-1/3">
          <TaskForm
            tasks={tasks}
            setTasks={setTasks}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />
        </div>

        <div className="w-2/3">
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            setEditingTask={setEditingTask}
          />
        </div >
      </div >
      {/* </div> */}
    </>
  );
};

export default Tasks;
