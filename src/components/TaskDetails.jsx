import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from './Button';

import './TaskDetails.css';
const TaskDetails = () => {
    const {taskTitle} = useParams();
    const navigate = useNavigate();
    const handleBackPageClick = () => {
        navigate('..')
    }
    return ( 
        <>
            <div className="back-button-container" onClick={handleBackPageClick}>
                <Button>Voltar</Button>
            </div>
            <div className="task-details-container">
                <h2>{taskTitle}</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, explicabo sunt ea magnam voluptatem error iste aperiam facere repellat iure illo dolorem quasi praesentium libero necessitatibus nihil. Doloribus, consequatur corporis.</p>
            </div>
        </>
     );
}
 
export default TaskDetails;