import { ITask, Tasks } from '../../organisms/Tasks';
import { useEffect, useState } from 'react';
import { taskService } from '../../../services/TaskService';

type Props = {
    
};

export const Home = (props: Props) => {
    const [tasks, setTasks] = useState<ITask[]>([])

    const handleGetTasks = async () => {
        const response = await taskService.getTasks()
        setTasks(response)
    }

    useEffect(() => {
        handleGetTasks().catch(console.error)
    }, [])

    return (   
        <Tasks
            tasks={tasks}
            handleGetTasks={handleGetTasks}
        ></Tasks>
    );
};