import { Text, Input, Select, Icon, Button, CheckIcon, VStack } from 'native-base'
import { MaterialCommunityIcons, Octicons, MaterialIcons,  } from '@expo/vector-icons'
import { useState } from 'react'
import { Pressable } from 'react-native'

export const MainText = ({message}) => {
    return(
        <Text 
        color="#ffffffbb" fontSize={30} bold
        >{message}</Text>
    )
}

export const RegularText = ({message}) => {
    return (
        <Text color="#ffffffbb" fontSize={18} bold>
            {message}
        </Text>
    );
}

export const ButtonDefault = ({message, onPress}) => {
    return (
        <Button 
            bg={'rgb(82, 91, 214)'} 
            p={'16px 16px'}
            w={'95%'}
            borderRadius={'6px'} 
            mt={'16px'}
            onPress={onPress}
        >
            {message}
        </Button>
    );
}

export const ButtonCancelDefault = ({message, onPress}) => {
    return(
        <Button 
            bg={'#d13030'} 
            p={'16px 16px'} 
            w={'95%'} 
            borderRadius={'6px'} 
            mt={'16px'}
            onPress={onPress}
        >
            {message}
        </Button>
    )
}

export const InputPassword = ({text, password, setPassword}) => {
    const [show, setShow] = useState(false);
    return(
        <Input variant={"filled"} borderRadius={'8px'}
            placeholderTextColor={'#7C7C8A'}
            placeholder={text}
            w={'95%'}
            h={'56px'}
            bg="#121214" padding={'16px'}
            fontSize={'16px'}
            InputLeftElement={<Icon as={<Octicons name={'key'}/>} ml={'18.5px'} size={5}/>}
            InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                    <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} mr={'18.5px'} size={5} />
                </Pressable>}
            value={password}
            onChangeText={password => setPassword(password)}
            type={show ? "text" : "password"}
        />
    )
}

export const InputLogin = ({text, login, setLogin}) => {
    return (
        <Input variant={"filled"} borderRadius={'8px'}
            placeholder={text}
            placeholderTextColor={'#7C7C8A'}
            w={'95%'}
            h={'56px'}
            bg="#121214" padding={'16px'}
            fontSize={'16px'}
            InputLeftElement={<Icon as={<MaterialCommunityIcons name={'email-outline'}/>} ml={'18.5px'} size={5}/>}
            value={login}
            onChangeText={login => setLogin(login)}
            keyboardType={'email-address'}
        />
    )
}

export const InputDefault = ({text, value, setValue, ...attributes}) => {
    return (
        <Input variant={"filled"} borderRadius={'8px'}
            placeholder={text}
            placeholderTextColor={'#7C7C8A'}
            w={'95%'}
            h={'56px'}
            bg="#121214"
            padding={'16px'}
            fontSize={'16px'}
            value={value}
            onChangeText={value => setValue(value)}
            {...attributes}
        />
    )
}

export const SelectDefault = ({selected, setSelected}) => {
    return(
        <Select 
            selectedValue={selected} 
            variant='filled' 
            minWidth="95%" 
            accessibilityLabel='Selecione a Urgência' 
            placeholder="Selecione a Urgência" 
            bg={"#121214"} 
            padding={'16px'}
            onValueChange={itemValue => setSelected(itemValue)}
            color="#7C7C8A"
            _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
            }}
            fontSize={16}
        >
            <Select.Item 
                label={'Baixa'}
                value={'0'}
            />
            <Select.Item 
                label={'Média'}
                value={'1'} 
            />
            <Select.Item 
                label={'Alta'} 
                value={'2'} 
            />
        </Select>
        );
  };