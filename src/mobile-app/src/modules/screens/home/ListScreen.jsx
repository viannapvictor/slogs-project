import { Box, FlatList, VStack } from 'native-base'
import { useIncidentLogs } from "../../shared/hooks/slogs-hooks";
import { Fab, Icon } from "native-base";
import { Ionicons } from '@expo/vector-icons'
import { useState } from "react";
import { useIsFocused } from '@react-navigation/native';
import CreateLogDialog from "./components/CreateLogDialog";
import SimpleIncidentLog from "./components/SimpleIncidentLog";

export default function ListScreen({ navigation }) {
    const { logs } = useIncidentLogs();
    const [dialog, setDialog] = useState(false);
    const isFocused = useIsFocused()

    return (
        <Box safeArea flex={1} bg="#242424">
            <VStack alignItems={'center'} w={'100%'}>
                <FlatList
                    w={'95%'}
                    data={logs}
                    renderItem={({item}) => <SimpleIncidentLog item={item} onDetailed={() => navigation.navigate('Log', { log: item })} />}
                    keyExtractor={(item) => item.id}
                />
            </VStack>
            <CreateLogDialog open={dialog} onClose={() => setDialog(false)} />
            {isFocused && <Fab
                placement="bottom-right"
                colorScheme="rgb(82, 91, 214)"
                size="lg"
                icon={<Icon as={<Ionicons name={'md-add'}/>} />}
                onPress={() => setDialog(true)}
            />}
        </Box>
    );
}