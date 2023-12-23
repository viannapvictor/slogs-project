import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './modules/base/components/Layout';
import AboutPage from './modules/pages/about/AboutPage';
import HomePage from './modules/pages/home/HomePage';
import SignInPage from './modules/pages/signin/SignInPage';
import SignUpPage from './modules/pages/signup/SignUpPage';
import { useAuth } from './modules/shared/hooks/api-hooks';
import LogPage from './modules/pages/log/LogPage';
import MembersPage from './modules/pages/members/MembersPage';
import OrganizationRole from './modules/shared/models/entities/OrganizationRole';
import SettingsPage from './modules/pages/settings/SettingsPage';

export default function Router(): JSX.Element {
    const { authenticated, currentAccount } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout showAuthButtons={true} />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    {authenticated && (
                        <>
                            <Route path="/members" element={<MembersPage />} />
                            <Route path="/log/:id" element={<LogPage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                            {currentAccount!.role <= OrganizationRole.Administrator && <Route path="/signup" element={<SignUpPage isUserForm={true} />} />}
                        </>
                    )}
                </Route>
                {!authenticated && (
                    <Route element={<Layout showAuthButtons={false} />}>
                        <Route path="/signin" element={<SignInPage />} />
                        <Route path="/signup" element={<SignUpPage isUserForm={false} />} />
                    </Route>
                )}
            </Routes>
        </BrowserRouter>
    );
}
