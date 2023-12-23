import { useState } from 'react';
import useDocumentTitle from '../../shared/utils/useDocumentTitle';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/api-hooks';
import { ErrorType, Success } from '../../shared/utils/slogs-api';
import { Button, Stack, TextField } from '../../shared/components/slogs-components';
import { type SubmitHandler, useForm } from 'react-hook-form';
import type OrganizationForm from '../../shared/models/forms/OrganizationForm';
import UserForm from '../../shared/models/forms/UserForm';

interface Props {
    isUserForm: boolean
}

export default function SignUpPage({ isUserForm }: Props): JSX.Element {
    useDocumentTitle('SignUp - Slogs');
    const { register, handleSubmit } = useForm<OrganizationForm | UserForm>();
    const { submitOrganization, submitUser, authenticated } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<OrganizationForm | UserForm> = (data: OrganizationForm | UserForm): void => {
        const afterSubmit = (result: Success) => {
            if (result.success) {
                authenticated ? navigate("/members") : navigate('/signin');
                return;
            }
            if (result.errorType === ErrorType.DuplicateEmail) {
                setErrorMessage('Já existe uma conta esse e-mail.');
                return;
            }
            if (result.errorType === ErrorType.PasswordTooShort) {
                setErrorMessage('A senha deve possuir mais de 6 caracteres.');
                return;
            }
            setErrorMessage('Não foi possível fazer o registro, tente novamente.');
        }
        if (!isUserForm) {
            submitOrganization(data as OrganizationForm).then(afterSubmit);
            return;
        }
        submitUser(data as UserForm).then(afterSubmit);
    };

    return (
        <ContainerForm>
            <h2>Realize seu Cadastro</h2>
            <Form onSubmit={handleSubmit(onSubmit)} component="form" spacing={4}>
                {errorMessage !== '' && (
                    <ErrorBox>
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    </ErrorBox>
                )}
                <Stack spacing={2} style={{ width: '100%' }}>
                    <LoginField
                        type="email"
                        placeholder="E-mail"
                        {...register('email', { required: true })}
                        data-cy="username"
                    />
                    <LoginField
                        type="text"
                        placeholder={!isUserForm ? "Nome da Organização" : "Nome completo"}
                        {...register('name', { required: true })}
                        data-cy="company"
                    />
                    {!isUserForm && <LoginField
                        type="phone"
                        placeholder="Telefone"
                        {...register('phone', { required: true })}
                        data-cy="phone"
                    />}
                    <LoginField
                        type="password"
                        placeholder="Senha"
                        {...register('password', { required: true })}
                        data-cy="password"
                    />
                </Stack>
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    style={{ width: '100%' }}
                >
                    <LoginButton>Cadastrar</LoginButton>
                    <Link to="/signin">
                        <Button variant="text">Já possui conta? Logar-se</Button>
                    </Link>
                </Stack>
            </Form>
        </ContainerForm>
    );
}

const ContainerForm = styled.div`
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    gap: 80px;
`;

const Form = styled(Stack)`
    @media only screen and (max-width: 500px) {
        width: 100%;
    }
`;

const LoginField = styled(TextField)`
    width: 450px;

    @media only screen and (max-width: 500px) {
        width: 100%;
    }
`;

const LoginButton = styled(Button)`
    width: 450px;

    @media only screen and (max-width: 500px) {
        width: 100%;
    }
`;

const ErrorBox = styled.div`
    padding: 14px;
    background-color: #fd5b5b1d;
    border-radius: 5px;

    width: 450px;

    @media only screen and (max-width: 500px) {
        width: 100%;
    }
`;

const ErrorMessage = styled.p`
    color: #ff4343;
`;
