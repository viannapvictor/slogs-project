import 'react-native-gesture-handler';
import { NativeBaseProvider, extendTheme } from 'native-base';
import Router from "./src/modules/base/Router";

const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
};
  
const customTheme = extendTheme({ config });

export default function App() {
    return (
        <NativeBaseProvider theme={customTheme} safeAreaView>
            <Router />
        </NativeBaseProvider>
    );
}
