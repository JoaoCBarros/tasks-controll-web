import { createContext, ReactNode, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {FaSignInAlt} from 'react-icons/fa'

import { authService } from "../services/AuthService";

const PageBoxTemplate = styled.section`
    display: flex;
    width: 100%;
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
    color: #22272D;
    cursor: pointer;
`

const Header = styled.div`
    border-bottom: 1px gray solid;
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 2%;
    justify-content: space-between;
    background-color: #FFFFFF;
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
    justify-content: center;
    display: flex;
    min-height: 70vh;
`

const Footer = styled.div`
    background-color: #22272D;
    height: 170px;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const TitleFooter = styled.h3`
     font-size: 20px;
    color: #FFFFFF;
    line-height: 170px;
`

const FooterLink = styled.a`
    color: #FFFFFF;
`

type Props = {
    children: ReactNode
};
export const PrivateRouter = ({children}: Props) => {
    const auth = authService.getLoggerUser()
    const UserContext = createContext(auth)
    const navigate = useNavigate()
    const handleLoggout = () => {
        authService.loggout();
        navigate("/login")
    }
    return auth ? (
        <PageBoxTemplate>
            <ContainerMain>
                <Header>
                    <LogoSite>
                        <LogoTitle>
                            TASKS CONTROLL
                        </LogoTitle>
                    </LogoSite>
                    <LoggedUser>
                        <SimpleTitle>
                            {auth.email}
                        </SimpleTitle>
                        <SignInAlt 
                            onClick={handleLoggout}
                        />
                    </LoggedUser>
                </Header>
                <UserContext.Provider value={authService.getLoggerUser()}>
                    <Content>
                        {children}
                    </Content>
                </UserContext.Provider>
                <Footer>
                    <TitleFooter>
                        Desenvolvido por <FooterLink href="https://www.linkedin.com/in/jo%C3%A3o-pedro-barros-05bb94180/" target="_blank">João Pedro Barros</FooterLink>
                    </TitleFooter>
                </Footer>
            </ContainerMain>
        </PageBoxTemplate>
    ) : (<Navigate to="/login"/>);
};