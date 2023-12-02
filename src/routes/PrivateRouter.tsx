import { createContext, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { FaSignInAlt } from "react-icons/fa";

import { authService } from "../services/AuthService";

const PageBoxTemplate = styled.section`
  display: flex;
  width: 100%;
`;

const SideBar = styled.div`
  padding: 1% 2%;
  width: 400px;
  background-color: #22272d;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

const LogoSite = styled.div`
  min-width: 120px;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: #ffffff 1px solid;
`;

const LogoTitle = styled.h2`
  font-size: 24px;
  color: #21262d;
  cursor: pointer;
`;

const Header = styled.div`
  -webkit-box-shadow: 0px 9px 7px -11px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 9px 7px -11px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 9px 7px -11px rgba(0, 0, 0, 0.75);
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 2%;
  justify-content: space-between;
`;

const LoggedUser = styled.div`
  min-width: 120px;
  height: 60px;
  align-items: center;
  display: flex;
`;

const SimpleTitle = styled.h2`
  font-size: 20px;
  color: #22272d;
`;

const SignInAlt = styled(FaSignInAlt)`
  color: #22272d;
  font-size: 24px;
  margin: 0 7px;
  cursor: pointer;
`;

const ContainerMain = styled.section`
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div``;

type Props = {
  children: ReactNode;
};
export const PrivateRouter = ({ children }: Props) => {
  const auth = authService.getLoggerUser();
  const UserContext = createContext(auth);
  return auth ? (
    <PageBoxTemplate>
      <ContainerMain>
        <Header>
          <LogoSite>
            <LogoTitle>TASKS CONTROLL</LogoTitle>
          </LogoSite>
          <LoggedUser>
            <SimpleTitle>{authService.getLoggerUser().email}</SimpleTitle>
            <SignInAlt />
          </LoggedUser>
        </Header>
        <UserContext.Provider value={authService.getLoggerUser()}>
          <Content>{children}</Content>
        </UserContext.Provider>
      </ContainerMain>
    </PageBoxTemplate>
  ) : (
    <Navigate to="/login" />
  );
};
