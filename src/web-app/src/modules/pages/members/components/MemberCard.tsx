import styled from "styled-components";
import SimpleAccount from "../../../shared/models/entities/SimpleAccount";
import { IconButton, Stack } from "../../../shared/components/slogs-components";
import { AiOutlineEdit } from "react-icons/ai";
import OrganizationRole from "../../../shared/models/entities/OrganizationRole";

interface Props {
    member: SimpleAccount;
    onEdit: () => void;
    role: OrganizationRole;
}

enum Role {
    'Dono',
    'Administrador',
    'Moderador',
    'Membro'
}

export default function MemberCard({ member, onEdit, role }: Props): JSX.Element {
    return(
        <Card spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <MemberName>{member.name}</MemberName>
                {role <= OrganizationRole.Administrator && <IconButton size="small" onClick={() => onEdit()}>
                    <AiOutlineEdit />
                </IconButton>}
            </Stack>
            <MemberRole>{Role[member.role]} - {member.email}</MemberRole>
        </Card>
    )
}

const Card = styled(Stack)`
    background-color: #63636330;
    padding: 8px;
    border-radius: 7px;
`;

const MemberName = styled.p`
    font-weight: bold;
`

const MemberRole = styled.p`
    font-size: 13px;
`;