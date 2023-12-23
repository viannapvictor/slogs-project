import styled from 'styled-components';
import { Stack } from '../../../shared/components/slogs-components';

export default function HomeUnauthorized(): JSX.Element {
    return (
        <HomeHeader>
            <Stack spacing={2}>
                <h2>Previna os acidentes de trabalho na sua organização</h2>
                <p>Registre desvios e catalogue suas prioridades</p>
            </Stack>
        </HomeHeader>
    );
}

const HomeHeader = styled.div`
    font-family: 'Quicksand', sans-serif;
`;
