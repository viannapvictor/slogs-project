import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "../screens/home/ListScreen";
import LogScreen from "../screens/home/LogScreen";

const Stack = createNativeStackNavigator();

export default function LogNavigation() {
    return (
        <Stack.Navigator screenOptions={{ title: '' }}>
            <Stack.Screen name="List" component={ListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Log" component={LogScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}