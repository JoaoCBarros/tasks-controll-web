// @flow 
import * as React from 'react';
import { TitlePrimary } from './style';
type Props = {
    children: string;
};
export const Title = ({children}: Props) => {
    return <TitlePrimary>
        {children}
    </TitlePrimary>;
};