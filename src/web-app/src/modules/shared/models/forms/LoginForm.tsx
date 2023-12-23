import type AccountForm from './AccountForm';

export default interface LoginForm extends AccountForm {
    remember: boolean;
}
