import { MdOutlineLogout } from 'react-icons/md';
import { AppThemeContext } from '../../../contexts/preference-contexts';
import SidebarButton from './SidebarButton';
import SidebarDiv from './SidebarDiv';
import ThemeIcon from './ThemeIcon';
import { useAuth } from '../../../../shared/hooks/api-hooks';
import { Stack } from '../../../../shared/components/slogs-components';
import { useNavigate } from 'react-router-dom';

interface Props {
    detailed: boolean;
}

export default function SidebarFooter({ detailed }: Props): JSX.Element {
    const { authenticated, logout } = useAuth();
    const navigate = useNavigate();
    return (
        <SidebarDiv $detailed={detailed} justifyContent="flex-end">
            <Stack spacing="10px">
                <AppThemeContext.Consumer>
                    {({ theme, changeTheme }) => (
                        <SidebarButton onClick={changeTheme}>
                            <ThemeIcon theme={theme} />
                            {detailed && 'Tema'}
                        </SidebarButton>
                    )}
                </AppThemeContext.Consumer>
                {authenticated && (
                    <SidebarButton
                        onClick={() => {
                            logout().then((result) => {
                                if (result) navigate("/");
                            })
                        }}
                    >
                        <MdOutlineLogout size={30} />
                        {detailed && 'Sair'}
                    </SidebarButton>
                )}
            </Stack>
        </SidebarDiv>
    );
}
