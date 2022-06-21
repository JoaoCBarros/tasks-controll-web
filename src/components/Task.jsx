import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import './Task.css';
const Task = ({task, handleTaskClick, handleTaskDelete}) => {
    return ( 
        <div className='task-container' style={task.completed ? {borderLeft: '6px solid chartreuse'} : {}}>
            <div className='task-title' onClick={() => handleTaskClick(task.id)}>
                <h1>{task.title}</h1>
            </div>
            <div className='buttons-container'>
                <button className='remove-task-button' onClick={() => handleTaskDelete(task.id)}>
                    <FaTrashAlt style={{color: "chartreuse"}}/>
                </button>
            </div>
        </div>
     );
}
 
export default Task;