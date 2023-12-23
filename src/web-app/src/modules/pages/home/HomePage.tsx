import useDocumentTitle from '../../shared/utils/useDocumentTitle';
import { Stack } from '../../shared/components/slogs-components';
import { useAuth } from '../../shared/hooks/api-hooks';
import HomeAuthorized from './sections/HomeAuthorized';
import HomeUnauthorized from './sections/HomeUnauthorized';

export default function HomePage(): JSX.Element {
    const { authenticated } = useAuth();
    useDocumentTitle('Home - Slogs');
    
    return <Stack>{authenticated ? <HomeAuthorized /> : <HomeUnauthorized />}</Stack>;
}
