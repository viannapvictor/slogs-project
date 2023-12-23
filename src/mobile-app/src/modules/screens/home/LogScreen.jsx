import { Box, VStack, Text } from "native-base";

const urgency = { '0': 'Baixa', '1': 'Média', '2': 'Alta' };

export default function LogScreen({ route }) {
    const incidentLog = route.params.log;
    
    return (
        <Box flex={1} safeArea bg="#242424">
            <VStack space={'30px'} padding={'8px'}>
                <VStack space={'13px'}>
                    <Text fontWeight={'bold'} fontSize={'24px'}>{incidentLog.title}</Text>
                    <Text fontSize={'15px'}>{incidentLog.description}</Text>
                </VStack>
                <Text fontWeight={'bold'}>Urgência: {urgency[incidentLog.urgency]}</Text>
                <Text fontWeight={'bold'}>Data de criação: {incidentLog.createdDateTime.toDate().toString()}</Text>
            </VStack>
        </Box>
    );
}