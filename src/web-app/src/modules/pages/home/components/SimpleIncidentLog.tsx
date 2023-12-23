import styled from 'styled-components';
import { Stack } from '../../../shared/components/slogs-components';
import type IncidentLog from '../../../shared/models/entities/IncidentLog';
import { useOrganization } from '../../../shared/hooks/api-hooks';
import { useEffect, useState } from 'react';
import Urgency from '../../../shared/models/entities/Urgency';
import { BsFillPatchExclamationFill } from 'react-icons/bs';

interface Props {
    item: IncidentLog;
    onClick: (id: string) => void;
}

export default function SimpleIncidentLog({ item, onClick }: Props): JSX.Element {
    const [name, setName] = useState<string>('');
    const { findAccount } = useOrganization();

    let urgencyColor: string;
    switch (item.urgency) {
        case Urgency.Low:
            urgencyColor = '#67c255';
            break;
        case Urgency.Medium:
            urgencyColor = '#d4ca32';
            break;
        case Urgency.High:
            urgencyColor = '#da3434';
            break;
    }

    useEffect(() => {
        findAccount(item.userId).then((result) => {
            setName(result.result?.name ?? '');
        });
    }, []);

    return (
        <LogContainer
            onClick={() => {
                onClick(item.id);
            }}
            spacing={2}
        >
            <BsFillPatchExclamationFill size={24} color={urgencyColor} />
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                <Title>{item.title}</Title>
                <Author>Autor: {name}</Author>
            </Stack>
        </LogContainer>
    );
}

const LogContainer = styled(Stack)`
    background-color: #63636330;
    padding: 8px;
    border-radius: 7px;
    cursor: pointer;
`;

const Title = styled.p`
    font-weight: 600;
`;

const Author = styled.p`
    font-size: 12px;
`;
