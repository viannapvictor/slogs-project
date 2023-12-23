import styled from "styled-components";
import Stack from "../../shared/components/Stack";
import { useAuth, useMembers } from "../../shared/hooks/api-hooks";
import MemberCard from "./components/MemberCard";
import useDocumentTitle from "../../shared/utils/useDocumentTitle";
import Button from "../../shared/components/Button";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import OrganizationRole from "../../shared/models/entities/OrganizationRole";
import { useState } from "react";
import EditMemberDialog from "./components/EditMemberDialog";
import SimpleAccount from "../../shared/models/entities/SimpleAccount";
import { OrganizationManager } from "../../shared/utils/slogs-api";

export default function MembersPage(): JSX.Element {
    const { members } = useMembers();
    const { currentAccount } = useAuth();
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editUser, setEditUser] = useState<SimpleAccount | null>(null);
    useDocumentTitle('Membros - Slogs');

    return (
        <Container spacing={2} alignItems="center">
            {dialogOpen && (
                <EditMemberDialog
                    closeDialog={() => {
                        setDialogOpen(false);
                    }}
                    user={editUser}
                />
            )}
            {currentAccount && currentAccount.role <= OrganizationRole.Administrator && <MembersHeader direction="row" justifyContent="flex-end">
                <Stack alignItems="center" spacing={1}>
                    <Button 
                        onClick={() => {
                            navigate(`/signup`)
                        }} 
                        startIcon={<AiOutlineUserAdd size={20} />} variant="outlined">
                        Criar usuário
                    </Button>
                </Stack>
            </MembersHeader>}
            <MembersGrid>
                {members.map((item) => (
                    <MemberCard key={item.id} member={item} role={currentAccount?.role ?? OrganizationRole.Member} onEdit={() => {
                        setEditUser(item);
                        setDialogOpen(true);
                    }} />
                ))}
            </MembersGrid>
        </Container>
    )
}

const Container = styled(Stack)`
`

const MembersHeader = styled(Stack)`
    width: 100%;
`;

const MembersGrid = styled.div`
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    width: 100%;
    gap: 20px;

    @media only screen and (max-width: 1366px) {
        grid-template-columns: 33.3333% 33.3333% 33.3333%;
    }

    @media only screen and (max-width: 1080px) {
        grid-template-columns: 50% 50%;
    }

    @media only screen and (max-width: 768px) {
        grid-template-columns: 100%;
    }
`;