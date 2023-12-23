import { InputLogin, InputPassword, InputDefault, MainText } from "../../shared/components/DefaulltItems";
import { Box, VStack, Button, Icon } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from "react";
import { AuthManager } from "../../shared/utils/slogs-firebase";

export default function RegisterScreen({ navigation }) {
    const [register, setRegister] = useState({ email: '', password: '', name: '', phone: '' });

    const handleSubmit = () => {
        if (register.email === '' || register.password === '' || register.name === '' || register.phone === '') {
            alert('Um dos campos não está preenchido');
            return;
        }
        AuthManager.registerOrganization(register).then((result) => {
            if (result.success) return;
            if (result.errorCode === 'auth/email-already-in-use') {
                alert('O e-mail já se encontra registrado');
            } else {
                alert('Não foi possível fazer o registro, tente novamente');
            }
        });
    }

    return (
        <Box safeArea flex={1} bg="#242424" flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
            <VStack alignItems={'center'} space={'24px'}>
                <MainText message={'Cadastrar Organização'} />
                <VStack alignItems={'center'} space={'16px'}>
                    <InputLogin 
                        text={'E-mail'}
                        login={register.email}
                        setLogin={(email) => setRegister(value => ({...value, email}))}
                        
                    />
                    <InputPassword 
                        text={'Senha'}
                        password={register.password}
                        setPassword={(password) => setRegister(value => ({...value, password}))}
                    />
                </VStack>
                <VStack alignItems={'center'} space={'16px'}>
                    <InputDefault
                        text={'Nome'}
                        InputLeftElement={<Icon as={<MaterialCommunityIcons name={'account-question-outline'}/>} ml={'18.5px'} size={5} />}
                        value={register.name}
                        setValue={(name) => setRegister(value => ({...value, name}))}
                    />
                    <InputDefault
                        text={'Telefone'}
                        keyboardType={'phone-pad'}
                        InputLeftElement={<Icon as={<MaterialCommunityIcons name={'phone-outline'}/>} ml={'18.5px'} size={5} />}
                        value={register.phone}
                        setValue={(phone) => setRegister(value => ({...value, phone}))}
                    />
                </VStack>
            </VStack>
            <Button 
                bg={'rgb(82, 91, 214)'} 
                p={'16px 16px'}  
                w={'70%'} 
                borderRadius={'6px'} 
                marginTop={'40px'}
                onPress={handleSubmit}
            >
                Registrar-se
            </Button>
            <Button
                colorScheme={'rgb(110, 118, 231)'} 
                variant={'ghost'}
                w={'70%'}
                marginTop={'10px'}
                onPress={() => navigation.navigate('Login')}
            >
                Já possui uma conta? Entre aqui
            </Button>
        </Box>
    );
}