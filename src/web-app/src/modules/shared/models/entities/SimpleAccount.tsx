import type OrganizationRole from './OrganizationRole';

export default interface SimpleAccount {
    id: string;
    email: string;
    name: string;
    role: OrganizationRole;
}
