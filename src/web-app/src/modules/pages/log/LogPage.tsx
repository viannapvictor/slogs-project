import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { type Result } from '../../shared/utils/slogs-api';
import { useOrganization } from '../../shared/hooks/api-hooks';
import type IncidentLog from '../../shared/models/entities/IncidentLog';
import Button from '../../shared/components/Button';

enum Urgency {
    'Baixa',
    'Média',
    'Alta',
}

export default function LogPage(): JSX.Element {
    const { id } = useParams();
    const { getIncidentLog } = useOrganization();
    const navigate = useNavigate();

    const [incidentLog, setIncidentLog] = useState<IncidentLog>();

    useEffect(() => {
        if (!id) return;

        getIncidentLog(id).then((response: Result<IncidentLog>) => {
            if (!response.success) return;

            setIncidentLog(response.result as IncidentLog);
        });
    }, []);

    if (!incidentLog) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <Button
                onClick={() => {
                    navigate(`/`);
                }}
                variant="outlined"
            >
                Voltar
            </Button>
            <Container>
                <Title>{incidentLog.title}</Title>
                <Description>{incidentLog.description}</Description>
                <DetailsContainer>
                    <DetailItem>
                        <DetailLabel>Urgência:</DetailLabel>
                        <DetailValue>{Urgency[incidentLog.urgency]}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                        <DetailLabel>Data de criação</DetailLabel>
                        <DetailValue>
                            {new Date(incidentLog.createdDateTime).toLocaleDateString()}
                        </DetailValue>
                    </DetailItem>
                </DetailsContainer>
                {incidentLog.images && incidentLog.images.length > 0 && (
                    <ImageContainer>
                        {incidentLog.images.map((image, index) => (
                            <img
                                key={index}
                                src={`data:image/jpeg;base64,${image.image}`}
                                alt={`Image ${index + 1}`}
                            />
                        ))}
                    </ImageContainer>
                )}
            </Container>
        </>
    );
}

const Title = styled.h2`
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 8px;
`;

const Description = styled.p`
    margin-bottom: 16px;
`;

const Container = styled.div`
    background-color: ${(props) => props.theme.header.background};
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
`;

const DetailsContainer = styled.div`
    margin-bottom: 16px;
`;

const DetailItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

const DetailLabel = styled.span`
    font-weight: bold;
    margin-right: 8px;
`;

const DetailValue = styled.span`
    font-size: 14px;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;

    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        margin-right: 8px;
        margin-bottom: 8px;
        border-radius: 4px;
    }
`;
