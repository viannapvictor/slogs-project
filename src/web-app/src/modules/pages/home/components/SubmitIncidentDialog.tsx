import styled from 'styled-components';
import Stack from '../../../shared/components/Stack';
import Button from '../../../shared/components/Button';
import TextField from '../../../shared/components/TextField';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useIncidentLogs, useOrganization } from '../../../shared/hooks/api-hooks';
import type IncidentLogForm from '../../../shared/models/forms/IncidentLogForm';
import Select from '../../../shared/components/Select';
import { useEffect, useRef } from 'react';

interface Props {
    closeDialog: () => void;
}

export default function SubmitIncidentDialog({ closeDialog }: Props): JSX.Element {
    const { submitIncident } = useOrganization();
    const { reloadLogs } = useIncidentLogs();
    const { register, handleSubmit } = useForm<IncidentLogForm>();
    const dialogRef = useRef<HTMLElement>(null);

    handleMouseDownEvent(dialogRef, closeDialog);

    const onSubmit: SubmitHandler<IncidentLogForm> = (data: IncidentLogForm): void => {
        submitIncident(data).then((response) => {
            if (!response.success) return;

            reloadLogs();
            closeDialog();
        });
    };

    return (
        <Container>
            <Dialog onSubmit={handleSubmit(onSubmit)} ref={dialogRef}>
                <h3>Registrar acidente</h3>
                <Stack spacing={2}>
                    <TextField
                        placeholder="Título"
                        type="text"
                        {...register('title', { required: true, maxLength: 100 })}
                        data-cy="title"
                    />
                    <TextField
                        placeholder="Descrição"
                        type="text"
                        {...register('description', { required: true, maxLength: 1000 })}
                        data-cy="Description"
                    />
                    <UrgencyParagraph>Urgência</UrgencyParagraph>
                    <Select
                        {...register('urgency', { required: true })}
                        variant="outlined"
                        color="#8890ff"
                        options={[
                            {
                                label: 'Baixa',
                                value: '0',
                            },
                            {
                                label: 'Mediana',
                                value: '1',
                            },
                            {
                                label: 'Alta',
                                value: '2',
                            },
                        ]}
                        data-cy="urgency"
                    />
                    <TextField type="file" accept=".jpg,.jpeg" multiple {...register('images')}
                    data-cy="image"
                    />
                </Stack>
                <Stack spacing={2} direction="row">
                    <CustomButton type="submit">Enviar</CustomButton>
                    <CustomButton
                        color="#d13030"
                        type="button"
                        onClick={() => {
                            closeDialog();
                        }}
                    >
                        Cancelar
                    </CustomButton>
                </Stack>
            </Dialog>
        </Container>
    );
}

function handleMouseDownEvent(
    dialogRef: React.RefObject<HTMLElement>,
    closeDialog: () => void
): void {
    useEffect(() => {
        const mouseHandler = (e: MouseEvent): void => {
            const menuElement = dialogRef.current;
            if (menuElement != null && !menuElement.contains(e.target as Node)) closeDialog();
        };
        document.addEventListener('mousedown', mouseHandler);
        return () => {
            document.removeEventListener('mousedown', mouseHandler);
        };
    }, []);
}

const Container = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    padding-top: 20vh;
    background-color: #00000053;
    top: 0;
    left: 0;
    z-index: 2000;
    align-items: flex-start;
`;

const Dialog = styled.form`
    width: 50vw;
    padding: 20px;
    background-color: #252525;
    border-radius: 9px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media only screen and (max-width: 768px) {
        width: 90vw;
    }
`;

const UrgencyParagraph = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
`;

const CustomButton = styled(Button)`
    width: 100%;
`;
