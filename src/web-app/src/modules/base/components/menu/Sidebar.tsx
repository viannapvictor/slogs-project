import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import type MenuItem from './models/MenuItem';
import SidebarBody from './components/SidebarBody';
import SidebarHeader from './components/SidebarHeader';
import SidebarFooter from './components/SidebarFooter';
import { useSidebarDetailed } from '../../hooks/preference-hooks';

interface Props {
    closed: boolean;
    items: MenuItem[][];
    onMenuClose: () => void;
}

export default function Sidebar({ closed, items, onMenuClose }: Props): JSX.Element {
    const [detailed, changeDetailed] = useSidebarDetailed();
    const menuRef = useRef<HTMLElement>(null);

    handleMouseDownEvent(menuRef, onMenuClose);
    return (
        <StyledSidebar closed={closed} $detailed={detailed} ref={menuRef}>
            <SidebarHeader detailed={detailed} changeDetailed={changeDetailed} />
            <SidebarBody items={items} detailed={detailed} />
            <SidebarFooter detailed={detailed} />
        </StyledSidebar>
    );
}

function handleMouseDownEvent(
    menuRef: React.RefObject<HTMLElement>,
    onMenuClose: () => void
): void {
    useEffect(() => {
        const mouseHandler = (e: MouseEvent): void => {
            const menuElement = menuRef.current;
            if (
                innerWidth <= 768 &&
                !closed &&
                menuElement != null &&
                !menuElement.contains(e.target as Node)
            )
                onMenuClose();
        };
        document.addEventListener('mousedown', mouseHandler);
        return () => {
            document.removeEventListener('mousedown', mouseHandler);
        };
    }, []);
}

const StyledSidebar = styled.nav<{ $detailed: boolean; closed: boolean }>`
    grid-area: sidebar;
    position: sticky;
    display: grid;
    row-gap: 20px;
    grid-template-rows: 50px 1fr 1fr;
    grid-template-columns: 1fr;
    top: 0;
    left: 0;
    background-color: ${(props) => props.theme.menu.background};
    transition: width 0.3s ease, transform 0.3s ease, background-color 0.25s linear;
    padding: 10px 14px;
    padding-top: 0px;
    height: 100vh;
    z-index: 1000;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    width: ${(props) => (props.$detailed ? '200px' : '88px;\nalign-items: center')};

    @media only screen and (max-width: 768px) {
        position: fixed;
        ${(props) => props.closed && `transform: translateX(${props.$detailed ? -215 : -103}px);`}
    }
`;
