import { InputLogin, InputPassword, MainText } from "../../shared/components/DefaulltItems";
import { Box, VStack, Button } from 'native-base'
import { useState } from "react";
import { AuthManager } from "../../shared/utils/slogs-firebase";


export default function LoginScreen({ navigation }) {
    const [login, setLogin] = useState({ email: '', password: '' });

    const handleSubmit = () => {
        if (login.email === '' || login.password === '') {
            alert('Um dos campos não está preenchido');
            return;
        }
        AuthManager.loginAccount(login).then((result) => {
            if (result.success) return;
            if (result.errorCode === 'auth/wrong-password' || result.errorCode === 'auth/user-not-found') {
                alert('Sua senha está incorreta ou o e-mail não está registrado.');
            } else {
                alert('Não foi possível fazer o login, tente novamente.');
            }
        });
    }

    return (
        <Box safeArea flex={1} bg="#242424" flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
            <VStack alignItems={'center'} space={'16px'}>
                <MainText message={'Realize seu Login'} />
                <InputLogin 
                    text={'E-mail'}
                    login={login.email}
                    setLogin={(email) => setLogin(value => ({...value, email}))}
                    
                />
                <InputPassword 
                    text={'Senha'}
                    password={login.password}
                    setPassword={(password) => setLogin(value => ({...value, password}))}
                />
            </VStack>
            <Button 
                bg={'rgb(82, 91, 214)'} 
                p={'16px 16px'}  
                w={'70%'} 
                borderRadius={'6px'} 
                marginTop={'40px'}
                onPress={handleSubmit}
            >
                Login
            </Button>
            <Button
                colorScheme={'rgb(110, 118, 231)'} 
                variant={'ghost'}
                w={'70%'}
                marginTop={'10px'}
                onPress={() => navigation.navigate('Register')}
            >
                Não possui conta? Registrar-se
            </Button>
        </Box>
    );
}