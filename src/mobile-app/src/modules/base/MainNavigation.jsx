import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../screens/home/ListScreen";
import LogoutScreen from '../screens/logout/LogoutScreen';
import LogScreen from '../screens/home/LogScreen';
import LogNavigation from './LogNavigation';

const Drawer = createDrawerNavigator();

export default function MainNavigation() {
    return (
        <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerTitle: '', headerTintColor: '#ffffffdc' }}>
            <Drawer.Screen 
                name="Home" 
                component={LogNavigation} 
                options={{ title: 'Início', drawerIcon: ({color, size}) => <Ionicons name="home-outline" color={color} size={size} /> }}
                
            />
            <Drawer.Screen 
                name="Logout" 
                component={LogoutScreen} 
                options={{ title: 'Sair', drawerIcon: ({color, size}) => <Ionicons name="exit-outline" color={color} size={size} /> }}
            />
            <Drawer.Screen
                name="Log"
                component={LogScreen}
                options={{ drawerItemStyle: { display: 'none' } }}
            />
        </Drawer.Navigator>    
    );
}