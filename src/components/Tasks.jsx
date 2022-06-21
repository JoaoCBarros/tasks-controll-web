import React from "react";
import Task from "./Task";

const Tasks = ({tasks, handleTaskClick, handleTaskDelete}) => {
    return <>
    {tasks.map((task, index) => <Task key={index} task={task} handleTaskClick={handleTaskClick} handleTaskDelete={handleTaskDelete}/>)}
    </>
}


export default Tasks