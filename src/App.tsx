import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AppProviders from './context';
import { useCurrentUser } from './context/UserProvider';
import FriendsPage from './pages/Friends';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SearchPage from './pages/Search';
import SettingsPage from './pages/Settings';
import UserPage from './pages/User';

function AuthenticatedComponent({ children }: { children: React.ReactNode }) {
    const user = useCurrentUser();

    return user ? <div>{children}</div> : <Navigate to="/login" />;
}

function App() {
    return (
        <AppProviders>
            <div className="App">
                <Toaster />
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route
                                index
                                element={
                                    <AuthenticatedComponent>
                                        <HomePage />
                                    </AuthenticatedComponent>
                                }
                            />
                            <Route
                                path="search"
                                element={
                                    <AuthenticatedComponent>
                                        <SearchPage />
                                    </AuthenticatedComponent>
                                }
                            />
                            <Route
                                path="friends"
                                element={
                                    <AuthenticatedComponent>
                                        <FriendsPage />
                                    </AuthenticatedComponent>
                                }
                            />
                            <Route
                                path="users/:userId"
                                element={
                                    <AuthenticatedComponent>
                                        <UserPage />
                                    </AuthenticatedComponent>
                                }
                            />
                            <Route
                                path="settings"
                                element={
                                    <AuthenticatedComponent>
                                        <SettingsPage />
                                    </AuthenticatedComponent>
                                }
                            />
                            <Route path="login" element={<LoginPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </AppProviders>
    );
}

export default App;
