import styled from 'styled-components';
import {FaSignInAlt} from 'react-icons/fa'
import { ITask, Tasks } from '../../organisms/Tasks';
import { useEffect, useState } from 'react';
import { authService } from '../../../services/AuthService';
import { taskService } from '../../../services/TaskService';
type Props = {
    
};

const PageBoxTemplate = styled.section`
    display: flex;
    width: 100%;
`

const Header = styled.div`
    -webkit-box-shadow: 0px 1px 10px 0.5px rgba(189,189,189,1);
    -moz-box-shadow: 0px 1px 10px 0.5px rgba(189,189,189,1);
    box-shadow: 0px 1px 10px 0.5px rgba(189,189,189,1);
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 2%;
    justify-content: flex-end;
`

const SideBar = styled.div`
    padding: 1% 2%;
    width: 400px;
    background-color: #22272D;
    display: flex;
    justify-content: center;
    min-height: 100vh;
`

const LogoSite = styled.div`
    min-width: 120px;
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: #FFFFFF 1px solid;
`

const LogoTitle = styled.h2`
    font-size: 24px;
    color: #FFFFFF;
    cursor: pointer;
`

const LoggedUser = styled.div`
    min-width: 120px;
    height: 60px;
    align-items: center;
    display: flex;
`

const SimpleTitle = styled.h2`
    font-size: 20px;
    color: #22272D;
`

const SignInAlt = styled(FaSignInAlt)`
    color: #22272D;
    font-size: 24px;
    margin: 0 7px;
    cursor: pointer;
`

const ContainerMain = styled.section`
    width: 100%;
    min-height: 100vh;
`

const Content = styled.div`
`

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
        <PageBoxTemplate>
            <SideBar>
                <LogoSite>
                    <LogoTitle>
                        TASKS CONTROLL
                    </LogoTitle>
                </LogoSite>
            </SideBar>
            <ContainerMain>
                <Header>
                    <LoggedUser>
                        <SimpleTitle>
                            jpedro.profissional@gmail.com
                        </SimpleTitle>
                        <SignInAlt />
                    </LoggedUser>
                </Header>
                <Content>
                    <Tasks
                        tasks={tasks}
                        handleGetTasks={handleGetTasks}
                    ></Tasks>
                </Content>
            </ContainerMain>
        </PageBoxTemplate>
    );
};