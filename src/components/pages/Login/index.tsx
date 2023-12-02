import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../../../services/AuthService";

import { BoxLoginContainer, MainContainer } from "./style";
import LoginBannerImage from "../../../assets/login-banner.png";

type Props = {};

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 70%;
  background-color: white;
  padding: 40px 20px;
  border-radius: 8px;
  flex: 1;
  max-height: 350px;
`;

const InputText = styled.input`
  width: 100%;
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

const ButtonPrimary = styled.button`
  font-size: 14px;
  margin: 7px 0;
  width: 100%;
  border: none;
  background-color: #080808;
  color: #ffffff;
  padding: 0 24px;
  height: 44px;
  border-radius: 8px;
  line-height: 100%;
  cursor: pointer;
`;

const Title = styled.h1`
  padding: 0 0 20px 0;
  font-size: 36px;
  color: #22272d;
`;

const SideBannerLogin = styled.div`
  background-color: red;
  height: 100vh;
  width: 100%;
  flex: 1;
`;

const SideBannerImage = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

export const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmitLoginForm = async (e: any) => {
    e.preventDefault();
    try {
      const response = await authService.authenticate({
        email,
        password,
      });
      authService.setLoggerUser(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Erro ao efetuar o login");
    }
  };
  const auth = authService.getLoggerUser();
  return !auth ? (
    <MainContainer>
      <SideBannerLogin>
        <SideBannerImage src={LoginBannerImage}></SideBannerImage>
      </SideBannerLogin>
      <BoxLoginContainer>
        <Form onSubmit={(e) => handleSubmitLoginForm(e)}>
          <Title>LOGIN</Title>
          <InputText
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
          <InputText
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <ButtonPrimary>ENTRAR</ButtonPrimary>
        </Form>
      </BoxLoginContainer>
    </MainContainer>
  ) : (
    <Navigate to="/" />
  );
};
