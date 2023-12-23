import type Account from './Account';

export default interface User extends Account {
    name: string;
    organizationId: string;
}
