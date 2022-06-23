// @flow 
import axios from 'axios';
import {useState} from 'react';
import styled from 'styled-components';
import { authService } from '../../../services/AuthService';

import { BoxLoginContainer, MainContainer } from './style';

type Props = {
    
};

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const InputText = styled.input`
    width: 100%;
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

const ButtonPrimary = styled.button`
    font-size: 14px;
    margin: 7px 0;
    width: 100%;
    border: none;
    background-color: #080808;
    color: #FFFFFF;
    padding: 0 24px;
    height: 44px;
    border-radius: 8px;
    line-height: 100%;
    cursor: pointer;

`

const Title = styled.h1`
    padding: 0 0 20px 0;
    font-size: 24px;
    color: #22272D;
`

export const Login = (props: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitLoginForm = async (e: any) => {
        e.preventDefault();
        try {
            const response = await authService.authenticate({
                email,
                password
            });
            authService.setLoggerUser(response.data);
        } catch (error) {
            console.log(error);
            alert("Erro ao efetuar o login");
        }
        
    }
    return (
        <MainContainer>
            <BoxLoginContainer>
                <Title>Login</Title>    
                <Form onSubmit={e => handleSubmitLoginForm(e)}>
                    <InputText
                        type="text" 
                        onChange={e => setEmail(e.target.value)} 
                        value={email} 
                        placeholder='Email'
                    />
                    <InputText type="password" 
                        placeholder='Senha'
                        onChange={e => setPassword(e.target.value)} 
                        value={password} 
                    />
                    <ButtonPrimary>ENTRAR</ButtonPrimary>
                </Form>
            </BoxLoginContainer>
        </MainContainer>
    );
};