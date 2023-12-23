import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import { useState } from 'react';
import Content from './content/Content';
import Footer from './footer/Footer';
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import styled, { ThemeProvider } from 'styled-components';
import { AppThemeContext } from '../contexts/preference-contexts';
import { useAppTheme } from '../hooks/preference-hooks';
import Sidebar from './menu/Sidebar';
import OrganizationRole from '../../shared/models/entities/OrganizationRole';
import MenuItem from './menu/models/MenuItem';

interface Props {
    showAuthButtons: boolean;
}

export default function Layout({ showAuthButtons }: Props): JSX.Element {
    const [closed, setClosed] = useState(true);
    const [theme, changeTheme] = useAppTheme();

    return (
        <ThemeProvider theme={theme}>
            <StyledLayout>
                <Header
                    onMenuOpen={() => {
                        setClosed(false);
                    }}
                    showAuthButtons={showAuthButtons}
                />
                <AppThemeContext.Provider value={{ theme: theme.type, changeTheme }}>
                    <Sidebar
                        onMenuClose={() => {
                            setClosed(true);
                        }}
                        closed={closed}
                        items={menuItems}
                    />
                </AppThemeContext.Provider>
                <Content>
                    <Outlet />
                </Content>
                <Footer />
            </StyledLayout>
        </ThemeProvider>
    );
}

const StyledLayout = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 50px 1fr 50px;
    grid-template-areas:
        'sidebar header'
        'sidebar main'
        'sidebar footer';
    min-height: 100vh;
    color: ${(props) => props.theme.textColor};

    @media only screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-areas:
            'header'
            'main'
            'footer';
    }
`;

const menuItems: MenuItem[][] = [
    [
        { path: '/', name: 'Início', icon: AiOutlineHome, authenticated: false },
        { path: '/members', name: 'Membros', icon: BsPeople, authenticated: true, minRole: OrganizationRole.Moderator },
        { path: '/settings', name: 'Configurações', icon: IoSettingsOutline, authenticated: true },
        { path: '/about', name: 'Sobre', icon: AiOutlineInfoCircle, authenticated: false },
    ],
];
