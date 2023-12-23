import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './Router';

const queryClient = new QueryClient();

export default function App(): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
    );
}
