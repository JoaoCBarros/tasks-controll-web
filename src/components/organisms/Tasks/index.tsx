// @flow 
import styled from 'styled-components';
import {DateTime} from 'luxon'
import { Modal } from '../../molecules/Modal';
import { useState } from 'react';
import { taskService } from '../../../services/TaskService';


interface ContainerProps {
    statusColor: string;
}

const Container = styled.div`
    min-height: 57.5vh;
`

const TasksContainer = styled.section`
    background-color: #E9EBEE;
    width: 100%;
    display: flex;
    padding: 2% 0;
    justify-content: center;
    flex-flow: row wrap;
    
`

const Task = styled.div<ContainerProps>`
    margin: 20px;
    background-color: #FFFFFF;
    padding: 10px;
    width: 400px;
    border-radius: 3px;
    -webkit-box-shadow: 0px 0px 4px 0px rgba(172,180,186,1);
    -moz-box-shadow: 0px 0px 4px 0px rgba(172,180,186,1);
    box-shadow: 0px 0px 4px 0px rgba(172,180,186,1);
    border-left: ${(props => props.statusColor)} 4px solid;
    border-right: #22272d67 0.5px solid;
    border-top: #22272d67 0.5px solid;
    border-bottom: #22272d67 0.5px solid;
`

const TaskTitle = styled.h3`
    text-align: left;
    color: #22272D;
    padding: 10px 0;
`

const TaskFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const TaskData = styled.span`
    color: #22272D;
    font-size: 14px;
`

const TaskDescription = styled.p`
    font-size: 14px;
    color: #22272D;
    text-align: justify;
    margin: 0 0 20px 0;
`

const FinishTaskButton = styled.button`
    font-size: 14px;
    margin: 7px 0;
    width: 40%;
    border: none;
    background-color: #22272D;
    color: #FFFFFF;
    padding: 0 24px;
    height: 30px;
    border-radius: 8px;
    line-height: 100%;
    cursor: pointer;

    &:hover {
        background-color: #333a43;
    }
`
const AddTaskButton = styled.button`
    font-size: 14px;
    margin: 7px 0;
    width: 200px;
    border: none;
    background-color: #22272D;
    color: #FFFFFF;
    padding: 0 24px;
    height: 44px;
    border-radius: 8px;
    line-height: 100%;
    cursor: pointer;
`

const TaskMeta = styled.div`
    display: flex;
    align-items: center;
`

const TasksHeader = styled.section`
    display: flex;
    justify-content: space-between;
    padding: 25px 2%;
    background-color: #FFFFFF;
    border-radius: 15px;
`
const Filters = styled.div`
`

const InputText = styled.input`
    width: 400px;
    padding: 0 7px;
    background-color: #FFFFFF;
    margin: 7px 0;
    border-radius: 4px;
    border-width: 1px;
    border-color: #ACB4BA;
    font-size: 14px;
    color: #737D86;
    line-height: 150%;
    height: 44px;
    border-style: solid;
    outline: 0;
`;

const InputData = styled.input`
    width: 400px;
    padding: 0 7px;
    background-color: #FFFFFF;
    margin: 7px 0;
    border-radius: 4px;
    border-width: 1px;
    border-color: #ACB4BA;
    font-size: 14px;
    color: #737D86;
    line-height: 150%;
    height: 44px;
    border-style: solid;
    outline: 0;
`;

const SimpleTitle = styled.h2`
    font-size: 20px;
    color: #22272D;
    margin: 15px 0;
`

const TaskContainer = styled.div`
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding: 0 4%;
    margin-top: 15px;
`
export interface ITask {
    title: string
    status: TTaskStatus
    expiresAt: string
    createdAt: DateTime
    description: string
    id: string
    isFinished: boolean
    isOverdue: boolean
    userId: string
}

type TTaskStatus = 'RED' | 'YELLOW' | 'GREEN'

type Props = {
  tasks: ITask[]  
  handleGetTasks(): void
};
export const Tasks = ({tasks, handleGetTasks}: Props) => {
    const [search, setSearch] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)
    const [taskDescription ,setTaskDescription] = useState<string>('')
    const [taskTitle ,setTaskTitle] = useState<string>('')
    const [expiresAt ,setExpiresAt] = useState<string>('')

    const handleModalClose = () => {
        setShow(false)
    }
    const handleModalOpen = () => {
        setShow(true)
    }

    const handleAddTask = async () => {
        const response = await taskService.addTask({
            title: taskTitle,
            description: taskDescription,
            expiresAt
        })
        console.log(response)
        setExpiresAt('')
        setTaskTitle('')
        setTaskDescription('')
        handleGetTasks()
        handleModalClose()
    }

    const handleFinishTask = async (taskId: string) => {
        await taskService.finishTask(taskId)
        handleGetTasks()
    }
    return <TaskContainer>
        <Modal
            show={show}
            handleClose={handleModalClose}
            handleAddTask={handleAddTask}
        >
            <SimpleTitle>
                Adicione sua task
            </SimpleTitle>
            <InputText
                type="text" 
                onChange={e => setTaskTitle(e.target.value)} 
                value={taskTitle} 
                placeholder='Titulo'
            />
            <InputText
                type="text" 
                onChange={e => setTaskDescription(e.target.value)} 
                value={taskDescription} 
                placeholder='Descrição'
            />
            <InputData 
                type="date"
                value={expiresAt}
                onChange={e => setExpiresAt(e.target.value)}
            />
        </Modal>
        <TasksHeader>
            <Filters>
                <InputText
                    type="text" 
                    onChange={e => setSearch(e.target.value)} 
                    value={search} 
                    placeholder='Buscar...'
                />
            </Filters>
            <AddTaskButton onClick={handleModalOpen}>
                Adicionar Task
            </AddTaskButton>
        </TasksHeader>
        <Container>
            <TasksContainer>
                {tasks.map((task, index) => {
                    let statusColor: string = '#1ECB4F'
                    if(task.status === 'GREEN'){
                        statusColor = '#1ECB4F';
                    }
                    if(task.status === 'YELLOW'){
                        statusColor = '#FFAE00';
                    }
                    if(task.status === 'RED'){
                        statusColor = '#FF3541';
                    }
                    const expiresAt = DateTime.fromISO(task.expiresAt.toString())
                    .toLocaleString({month: 'long', day: 'numeric', year: 'numeric'})

                    return <Task statusColor={statusColor} key={index}>
                    <TaskTitle>
                        {task.title}
                    </TaskTitle>
                    <TaskDescription>
                        {limitCaracteres(task.description, 103)}
                    </TaskDescription>
                    <TaskFooter>
                        <TaskMeta>
                            <TaskData>
                                {expiresAt}
                            </TaskData>
                        </TaskMeta>
                        <FinishTaskButton
                            onClick={() => handleFinishTask(task.id)}
                        >
                            Finalizar Task
                        </FinishTaskButton>
                    </TaskFooter>
                </Task>
                })}
            </TasksContainer>
        </Container>
    </TaskContainer>
};

const limitCaracteres = (dataStringToLimit: string, maxCaracteres: number) => {
    const dataStringLimited = dataStringToLimit.substring(0,maxCaracteres);
    return dataStringLimited.length === maxCaracteres ? `${dataStringLimited}...`: dataStringLimited;
}