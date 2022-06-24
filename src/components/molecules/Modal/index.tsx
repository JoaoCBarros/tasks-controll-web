// @flow 
import * as React from 'react';
import styled from 'styled-components';
type Props = {
    handleClose(): void
    handleAddTask(): void
    show: boolean
    children: any
};

interface TModalMainProps {
    display: string
}

const ModalBox = styled.div<TModalMainProps>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${props => props.display};
    background-color: #CCD1D680;
`

const ModalMain = styled.div<TModalMainProps>`
    -webkit-box-shadow: 0px 1px 10px 0.5px rgba(189,189,189,1);
    -moz-box-shadow: 0px 1px 10px 0.5px rgba(189,189,189,1);
    box-shadow: 0px 1px 10px 0.5px rgba(189,189,189,1);
    padding: 20px 20px;
    position: fixed;
    background-color: #FFFFFF;
    width: 500px;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: ${props => props.display};
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
`

const CloseModalButton = styled.button`
    font-size: 14px;
    margin: 7px 5px;
    width: 100px;
    border: none;
    background-color: #22272D;
    color: #FFFFFF;
    padding: 0 24px;
    height: 44px;
    border-radius: 8px;
    line-height: 100%;
    cursor: pointer;
`
const ActionModalButton = styled.button`
    font-size: 14px;
    margin: 7px 5px;
    width: 200px;
    border: none;
    background-color: #3D27BA;
    color: #FFFFFF;
    padding: 0 24px;
    height: 44px;
    border-radius: 8px;
    line-height: 100%;
    cursor: pointer;
`
const ModalFooter = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Modal = ({handleAddTask, handleClose, show, children}: Props) => {
    const display = show ? 'flex' : 'none'
    return (
        <ModalBox
            display={display}
        >
            <ModalMain
                display={display}
            >
                {children}
                <ModalFooter>
                    <CloseModalButton type='button' onClick={handleClose}>Close</CloseModalButton>
                    <ActionModalButton type='button' onClick={handleAddTask}>Adicionar</ActionModalButton>
                </ModalFooter>
            </ModalMain>
        </ModalBox>
    );
};