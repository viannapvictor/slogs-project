import { Box, Text, VStack } from 'native-base'
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAuth } from '../../../shared/hooks/slogs-hooks';

export default function SimpleIncidentLog({ item, onDetailed }) {
    const { currentAccount } = useAuth();

    let urgencyColor;
    switch (item.urgency) {
        case '0':
            urgencyColor = '#67c255';
            break;
        case '1':
            urgencyColor = '#d4ca32';
            break;
        case '2':
            urgencyColor = '#da3434';
            break;
    }

    return (
        <Box marginBottom={'10px'}>
            <TouchableOpacity onPress={() => onDetailed(item.id)}>
                <VStack borderRadius={'5px'} padding={'8px'} bg={'#383838'} space={'10px'}>
                    <MaterialCommunityIcons name="alert-decagram" size={24} color={urgencyColor} />
                    <VStack direction={'row'} justifyContent={'space-between'}>
                        <Text>{item.title}</Text>
                        <Text>{currentAccount && currentAccount.name}</Text>
                    </VStack>
                </VStack>
            </TouchableOpacity>
        </Box>
    );
}