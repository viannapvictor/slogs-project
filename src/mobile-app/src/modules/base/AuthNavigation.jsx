import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/register/RegisterScreen";
import LoginScreen from "../screens/login/LoginScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}