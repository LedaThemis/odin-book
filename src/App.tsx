import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AppProviders from './context';
import { useUser } from './context/UserProvider';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SearchPage from './pages/Search';

function AuthenticatedComponent({ children }: { children: React.ReactNode }) {
    const user = useUser();

    return user ? <div>{children}</div> : <Navigate to="/login" />;
}

function App() {
    return (
        <AppProviders>
            <div className="App">
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
                            <Route path="login" element={<LoginPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </AppProviders>
    );
}

export default App;
