import { Box } from "native-base";
import { AuthManager } from "../../shared/utils/slogs-firebase";

export default function LogoutScreen() {
    AuthManager.logoutUser();

    return (
        <Box />
    )
}