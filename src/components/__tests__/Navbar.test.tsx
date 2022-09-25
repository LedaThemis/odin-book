import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '../../context/AuthProvider';
import { UserProvider } from '../../context/UserProvider';
import Navbar from '../Navbar';

/* eslint-disable react/display-name */
jest.mock('../SearchBar', () => () => <div data-testid="SearchBar" />);
jest.mock('../UserMenu', () => () => <div data-testid="UserMenu" />);
jest.mock('../icons/FacebookIcon', () => () => (
    <div data-testid="FacebookIcon" />
));
jest.mock('../icons/FriendsIcon', () => () => (
    <div data-testid="FriendsIcon" />
));
jest.mock('../icons/HomeIcon', () => () => <div data-testid="HomeIcon" />);
jest.mock('../icons/MessagesIcon', () => () => (
    <div data-testid="MessagesIcon" />
));

test('should render SearchBar', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <UserProvider>
                        <Navbar />
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>,
    );

    expect(await screen.findByTestId('SearchBar')).toBeVisible();
});

test('should show UserMenu after click', async () => {
    const user = userEvent.setup();

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <UserProvider>
                        <Navbar />
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>,
    );

    const userIcon = await screen.findByAltText('Profile Avatar');

    expect(screen.queryByTestId('UserMenu')).not.toBeInTheDocument();

    await user.click(userIcon);

    expect(screen.getByTestId('UserMenu')).toBeVisible();
});

test('should render FacebookIcon', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <UserProvider>
                        <Navbar />
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>,
    );

    expect(await screen.findByTestId('FacebookIcon')).toBeVisible();
});

test('should render FriendsIcon', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <UserProvider>
                        <Navbar />
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>,
    );

    expect(await screen.findByTestId('FriendsIcon')).toBeVisible();
});

test('should render HomeIcon', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <UserProvider>
                        <Navbar />
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>,
    );

    expect(await screen.findByTestId('HomeIcon')).toBeVisible();
});

test('should render MessagesIcon', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <UserProvider>
                        <Navbar />
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>,
    );

    expect(await screen.findByTestId('MessagesIcon')).toBeVisible();
});

test('should render UserIcon', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <UserProvider>
                        <Navbar />
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>,
    );

    expect(await screen.findByAltText('Profile Avatar')).toBeVisible();
});
