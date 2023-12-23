import styled from 'styled-components';
import Button from '../../../shared/components/Button';
import Stack from '../../../shared/components/Stack';
import SubmitIncidentDialog from '../components/SubmitIncidentDialog';
import { useState } from 'react';
import { useIncidentLogs } from '../../../shared/hooks/api-hooks';
import SimpleIncidentLog from '../components/SimpleIncidentLog';
import { useNavigate } from 'react-router-dom';
import Paginate from '../../../shared/components/Paginate';

const logsPerPage = 7;

export default function HomeAuthorized(): JSX.Element {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [firstIndex, setFirstIndex] = useState(0);
    const { incidentLogs } = useIncidentLogs();
    const navigate = useNavigate();

    const lastIndex = firstIndex + logsPerPage;
    const pageCount = Math.ceil(incidentLogs.length / logsPerPage);
    const currentIncidentLogs = incidentLogs.slice(firstIndex, lastIndex);

    return (
        <Stack spacing={4}>
            {dialogOpen && (
                <SubmitIncidentDialog
                    closeDialog={() => {
                        setDialogOpen(false);
                    }}
                />
            )}
            <DialogButton
                variant="outlined"
                onClick={() => {
                    setDialogOpen(true);
                }}
            >
                Registrar Incidente
            </DialogButton>
            <Paginate
                pageCount={pageCount === 0 ? 1 : pageCount}
                onPageChange={(newPage) => {
                    setFirstIndex((newPage * logsPerPage) % incidentLogs.length);
                }}
            />
            <Stack spacing={2}>
                {currentIncidentLogs.map((item, i) => (
                    <SimpleIncidentLog
                        key={item.id}
                        item={item}
                        onClick={(id) => {
                            navigate(`/log/${id}`);
                        }}
                    />
                ))}
            </Stack>
        </Stack>
    );
}

const DialogButton = styled(Button)`
    align-self: center;
`;
