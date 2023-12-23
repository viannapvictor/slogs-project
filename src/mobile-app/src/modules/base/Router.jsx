import { useAuth } from "../shared/hooks/slogs-hooks";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";
import { Box } from "native-base";

export default function Router() {
    const { authenticated } = useAuth();

    return (
        <Box flex={1} bg="#242424">
            <NavigationContainer theme={DarkTheme}>
                {authenticated ? <MainNavigation /> : <AuthNavigation />}
            </NavigationContainer>
        </Box>
    );
}