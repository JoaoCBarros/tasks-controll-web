// @flow
import styled from "styled-components";
import { DateTime } from "luxon";
import { Modal } from "../../molecules/Modal";
import { useState } from "react";
import { taskService } from "../../../services/TaskService";

interface ContainerProps {
  statusColor: string;
}

const TasksContainer = styled.section`
  background-color: #e9ebee;
  min-height: calc(100vh - 188px);
`;

const Task = styled.div<ContainerProps>`
  margin: 20px;
  background-color: #ffffff;
  padding: 10px;
  width: 400px;
  border-radius: 3px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(172, 180, 186, 1);
  -moz-box-shadow: 0px 0px 4px 0px rgba(172, 180, 186, 1);
  box-shadow: 0px 0px 4px 0px rgba(172, 180, 186, 1);
  border-left: ${(props) => props.statusColor} 8px solid;
  max-height: 165px;
`;

const TaskTitle = styled.h3`
  color: #22272d;
  padding: 10px;
`;

const TaskFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskData = styled.span`
  color: #22272d;
  font-size: 14px;
`;

const TaskDescription = styled.p`
  font-size: 14px;
  color: #22272d;
  text-align: justify;
  margin: 0 0 20px 0;
`;

const FinishTaskButton = styled.button`
  font-size: 14px;
  margin: 7px 0;
  width: 40%;
  border: none;
  background-color: #3d27ba;
  color: #ffffff;
  padding: 0 24px;
  height: 44px;
  border-radius: 8px;
  line-height: 100%;
  cursor: pointer;
`;
const AddTaskButton = styled.button`
  font-size: 14px;
  margin: 7px 0;
  width: 200px;
  border: none;
  background-color: #22272d;
  color: #ffffff;
  padding: 0 24px;
  height: 44px;
  border-radius: 8px;
  line-height: 100%;
  cursor: pointer;
`;

const TaskMeta = styled.div`
  display: flex;
  align-items: center;
`;

const TasksHeader = styled.section`
  display: flex;
  justify-content: flex-end;
  padding: 15px 2%;
`;
const Filters = styled.div``;

const InputText = styled.input`
  width: 400px;
  padding: 0 7px;
  background-color: #ffffff;
  margin: 7px 0;
  border-radius: 4px;
  border-width: 1px;
  border-color: #acb4ba;
  font-size: 14px;
  color: #737d86;
  line-height: 150%;
  height: 44px;
  border-style: solid;
  outline: 0;
`;

const InputData = styled.input`
  width: 400px;
  padding: 0 7px;
  background-color: #ffffff;
  margin: 7px 0;
  border-radius: 4px;
  border-width: 1px;
  border-color: #acb4ba;
  font-size: 14px;
  color: #737d86;
  line-height: 150%;
  height: 44px;
  border-style: solid;
  outline: 0;
`;

const SimpleTitle = styled.h2`
  font-size: 20px;
  color: #22272d;
  margin: 15px 0;
`;

const TasksContent = styled.h2`
  background-color: #e9ebee;
  width: 100%;
  display: flex;
  padding: 2% 4%;
  justify-content: center;
  flex-flow: row wrap;
`;
export interface ITask {
  title: string;
  status: TTaskStatus;
  expiresAt: string;
  createdAt: DateTime;
  description: string;
  id: string;
  isFinished: boolean;
  isOverdue: boolean;
  userId: string;
}

type TTaskStatus = "RED" | "YELLOW" | "GREEN";

type Props = {
  tasks: ITask[];
  handleGetTasks(): void;
};
export const Tasks = ({ tasks, handleGetTasks }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<string>("");

  const handleModalClose = () => {
    setShow(false);
  };
  const handleModalOpen = () => {
    setShow(true);
  };

  const handleAddTask = async () => {
    const response = await taskService.addTask({
      title: taskTitle,
      description: taskDescription,
      expiresAt,
    });
    console.log(response);
    setExpiresAt("");
    setTaskTitle("");
    setTaskDescription("");
    handleGetTasks();
    handleModalClose();
  };

  const handleFinishTask = async (taskId: string) => {
    await taskService.finishTask(taskId);
    handleGetTasks();
  };
  return (
    <>
      <Modal
        show={show}
        handleClose={handleModalClose}
        handleAddTask={handleAddTask}
      >
        <SimpleTitle>Adicione sua task</SimpleTitle>
        <InputText
          type="text"
          onChange={(e) => setTaskTitle(e.target.value)}
          value={taskTitle}
          placeholder="Titulo"
        />
        <InputText
          type="text"
          onChange={(e) => setTaskDescription(e.target.value)}
          value={taskDescription}
          placeholder="Descrição"
        />
        <InputData
          type="date"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
        />
      </Modal>
      <TasksHeader>
        {/* <Filters>
                <InputText
                    type="text" 
                    onChange={e => setSearch(e.target.value)} 
                    value={search} 
                    placeholder='Buscar...'
                />
            </Filters> */}
        <AddTaskButton onClick={handleModalOpen}>Adicionar Task</AddTaskButton>
      </TasksHeader>
      <TasksContainer>
        <TasksContent>
          {tasks.map((task, index) => {
            let statusColor: string = "#1ECB4F";
            if (task.status === "GREEN") {
              statusColor = "#1ECB4F";
            }
            if (task.status === "YELLOW") {
              statusColor = "#FFAE00";
            }
            if (task.status === "RED") {
              statusColor = "#FF3541";
            }
            const expiresAt = DateTime.fromISO(
              task.expiresAt.toString()
            ).toLocaleString({
              month: "long",
              day: "numeric",
              year: "numeric",
            });

            return (
              <Task statusColor={statusColor} key={index}>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDescription>{task.description}</TaskDescription>
                <TaskFooter>
                  <FinishTaskButton onClick={() => handleFinishTask(task.id)}>
                    Finalizar Task
                  </FinishTaskButton>
                  <TaskMeta>
                    <TaskData>{expiresAt}</TaskData>
                  </TaskMeta>
                </TaskFooter>
              </Task>
            );
          })}
        </TasksContent>
      </TasksContainer>
    </>
  );
};
