import React, { useState } from "react";
import './App.css';
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import {v4 as uuidv4} from "uuid"
const App = () => {
  const [tasks, setTasks] = useState([{
    id: '1',
    title: 'Estudar Programação',
    completed: false
  },
{
  id:"2",
  title: "Ler livros",
  completed: true
}])

const hanldeTaskAddition = (taskTitle) => {
  const newTasks = [...tasks, {
    title: taskTitle,
    id: uuidv4(),
    completed: false
  }]
  setTasks(newTasks)
}

const handleTaskClick = (taskId) => {
  const newTasks = tasks.map((task) => {
    if(task.id === taskId) return {
      ...task,
      completed: !task.completed
    }

    return task
  })
  setTasks(newTasks)
}

const handleTaskDelete = (taskId) => {
  const newTasks = tasks.filter((task) => {
    return task.id !== taskId
  })
  setTasks(newTasks)
}
  return (
    <>
      <div className="container">
        <AddTask hanldeTaskAddition={hanldeTaskAddition} />
        <Tasks tasks={tasks} handleTaskClick={handleTaskClick} handleTaskDelete={handleTaskDelete}/>
      </div>
    </>
  )
}
 
export default App