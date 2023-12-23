import { type MouseEventHandler, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
    active?: boolean;
    component?: ComponentType;
    to?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    children?: ReactNode;
    id?: string;
}

type ComponentType = 'button' | 'router-link';

export default function SidebarButton({
    active = false,
    component = 'button',
    to,
    onClick,
    children,
    id,
}: Props): JSX.Element {
    const currentComponent =
        component === 'button' ? (
            <a id={id} draggable="false" href={to} onClick={onClick}>
                {children}
            </a>
        ) : (
            <Link id={id} draggable="false" to={to ?? '/'}>
                {children}
            </Link>
        );

    return <SidebarList $active={active}>{currentComponent}</SidebarList>;
}

const SidebarList = styled.li<{ $active: boolean }>`
    list-style: none;

    > a {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 1rem;
        font-family: 'Quicksand', sans-serif;
        gap: 8px;
        border-radius: 5px;
        padding: 8px;
        transition: background-color 0.25s ease;
        ${(props) =>
            props.$active &&
            `background-color: ${props.theme.menu.link.active.background};color: ${props.theme.menu.link.active.color};`}
    }

    ${(props) =>
        !props.$active &&
        `
    > a:hover {
        background-color: ${props.theme.menu.link.hover.background};
    }`}
`;
