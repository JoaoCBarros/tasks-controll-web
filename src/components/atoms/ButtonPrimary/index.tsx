// @flow 
import * as React from 'react';
import {ButtonPrimaryStyle} from './style'
type Props = {
    children: string;
};
export const ButtonPrimary = ({children}: Props) => {
    return (
        <ButtonPrimaryStyle>
            {children}
        </ButtonPrimaryStyle>
    );
};