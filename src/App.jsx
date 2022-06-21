import React, { useState } from "react";
import {v4 as uuidv4} from "uuid"
import { Route, Routes } from "react-router-dom";

import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Header from "./components/Header";

import './App.css';
import TaskDetails from "./components/TaskDetails";

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
    <div className="container">
      <Header/>
      <Routes>
        <Route path="/" exact element={
          <>
            <AddTask hanldeTaskAddition={hanldeTaskAddition} />
            <Tasks tasks={tasks} handleTaskClick={handleTaskClick} handleTaskDelete={handleTaskDelete}/>
          </>
        }>
        </Route>
        <Route path="/:taskTitle" exact element={<TaskDetails/>}>
        </Route>
      </Routes>
    </div>
  )
}
 
export default App