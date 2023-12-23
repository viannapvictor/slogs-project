import type AccountForm from './AccountForm';

export default interface OrganizationForm extends AccountForm {
    name: string;
    phone: string;
}
