import styled from 'styled-components';
import useDocumentTitle from '../../shared/utils/useDocumentTitle';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ErrorType } from '../../shared/utils/slogs-api';
import { Button, CheckBox, Stack, TextField } from '../../shared/components/slogs-components';
import { useAuth } from '../../shared/hooks/api-hooks';
import { type SubmitHandler, useForm } from 'react-hook-form';
import type LoginForm from '../../shared/models/forms/LoginForm';

export default function SignInPage(): JSX.Element {
    useDocumentTitle('SignIn - Slogs');
    const { register, handleSubmit } = useForm<LoginForm>();
    const { submitLogin } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginForm> = (data: LoginForm): void => {
        submitLogin(data).then((result) => {
            if (result.success) {
                navigate('/');
                return;
            }
            if (result.errorType === ErrorType.IncorrectEmailOrPassword) {
                setErrorMessage('Sua senha está incorreta ou o e-mail não está registrado.');
            } else {
                setErrorMessage('Não foi possível fazer o login, tente novamente.');
            }
        });
    };

    return (
        <ContainerForm>
            <h2>Realize seu login</h2>
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
                        type="password"
                        placeholder="Senha"
                        {...register('password', { required: true })}
                        data-cy="password"
                    />
                    <CheckBox label="Manter-me logado" {...register('remember')} />
                </Stack>
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    style={{ width: '100%' }}
                >
                    <LoginButton>Login</LoginButton>
                    <Link to="/signup">
                        <Button variant="text">Não possui conta? Registrar-se</Button>
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
