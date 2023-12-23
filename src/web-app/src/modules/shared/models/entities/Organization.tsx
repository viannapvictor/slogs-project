import type Account from './Account';

export default interface Organization extends Account {
    name: string;
    phone: number;
}
