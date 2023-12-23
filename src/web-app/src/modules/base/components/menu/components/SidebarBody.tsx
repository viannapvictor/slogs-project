import type MenuItem from '../models/MenuItem';
import { useLocation } from 'react-router-dom';
import SidebarButton from './SidebarButton';
import SidebarDiv from './SidebarDiv';
import { Stack } from '../../../../shared/components/slogs-components';
import { useAuth } from '../../../../shared/hooks/api-hooks';
import { Fragment } from 'react';

interface Props {
    items: MenuItem[][];
    detailed: boolean;
}

export default function SidebarBody({ items, detailed }: Props): JSX.Element {
    const auth = useAuth();

    return (
        <SidebarDiv $detailed={detailed} draggable="false">
            {getSidebarLists(detailed, auth, ...items)}
        </SidebarDiv>
    );
}

function getSidebarLists(detailed: boolean, auth: any, ...items: MenuItem[][]): JSX.Element[] {
    const activePath = useLocation().pathname;

    return items.map((linksList, index) => (
        <Stack key={index} spacing="10px">
            {getLinkItems(detailed, auth, activePath, linksList)}
        </Stack>
    ));
}

function getLinkItems(detailed: boolean, auth: any, activePath: string, items: MenuItem[]): JSX.Element[] {
    return items.map((value, index) => {
        if (value.authenticated && (!auth.authenticated || auth.currentAccount.role > value.minRole!)) return <Fragment key={index}></Fragment>

        const active = activePath === value.path;
        return (
            <SidebarButton key={index} id={`menu-link-${value.name.toLowerCase()}`} active={active} to={value.path} component="router-link">
                <value.icon size={30} />
                {detailed && value.name}
            </SidebarButton>
        );
    });
}
