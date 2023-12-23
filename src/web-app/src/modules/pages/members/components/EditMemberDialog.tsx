import styled from 'styled-components';
import Stack from '../../../shared/components/Stack';
import Button from '../../../shared/components/Button';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useAuth, useMembers, useOrganization } from '../../../shared/hooks/api-hooks';
import Select from '../../../shared/components/Select';
import { useEffect, useRef } from 'react';
import OrganizationRole from '../../../shared/models/entities/OrganizationRole';
import SimpleAccount from '../../../shared/models/entities/SimpleAccount';
import EditUserForm from '../../../shared/models/entities/EditUserForm';

interface Props {
    closeDialog: () => void;
    user: SimpleAccount | null
}

export default function EditMemberDialog({ closeDialog, user}: Props): JSX.Element {
    const { updateUserRole } = useOrganization();
    const { reloadMembers } = useMembers();
    const { currentAccount } = useAuth();
    const { register, handleSubmit } = useForm<EditUserForm>();
    const dialogRef = useRef<HTMLElement>(null);

    handleMouseDownEvent(dialogRef, closeDialog);

    const onSubmit: SubmitHandler<EditUserForm> = (data: { organizationRole: OrganizationRole }): void => {
        updateUserRole(user?.id ?? "", data).then((response) => {
            if (!response.success) return;

            reloadMembers();
            closeDialog();
        });
    };

    return (
        <Container>
            <Dialog onSubmit={handleSubmit(onSubmit)} ref={dialogRef}>
                <h3>Editar membro</h3>
                <Stack spacing={2}>
                    <UrgencyParagraph>Cargo</UrgencyParagraph>
                    <Select
                        {...register('organizationRole', { required: true })}
                        variant="outlined"
                        color="#8890ff"
                        options={getOptionsFromRole(currentAccount?.role ?? null)}
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

function getOptionsFromRole(role: OrganizationRole | null): { label: string, value: string }[] {
    const options = [
        {
            label: 'Administrador',
            value: '1',
        },
        {
            label: 'Moderador',
            value: '2',
        },
        {
            label: 'Membro',
            value: '3',
        },
    ];
    if (role === null || role === OrganizationRole.Owner) return options;
    if (role === OrganizationRole.Administrator) return options.splice(1);
    
    return [];
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
