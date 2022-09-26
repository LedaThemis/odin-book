import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '../../context/AuthProvider';
import { UserProvider } from '../../context/UserProvider';
import {
    genericCurrentUser,
    genericPost,
    genericUser,
} from '../../mocks/handlers';
import PostHeader from '../PostHeader';

// eslint-disable-next-line react/display-name
jest.mock('../PostActionMenu', () => () => (
    <div data-testid="PostActionMenu" />
));

test('should render ThreeDots if current user is post author', async () => {
    const post = { ...genericPost, author: genericCurrentUser };

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
                        <PostHeader post={post} />
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>,
    );

    expect(await screen.findByRole('button')).toBeVisible();
});

test('should not render ThreeDots if current user is not post author', async () => {
    const post = {
        ...genericPost,
        author: { ...genericUser, _id: 'NotCurrentUser' },
    };

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
                        <PostHeader post={post} />
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>,
    );

    await screen.findByText(genericUser.displayName);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('should render PostActionMenu on ThreeDots click', async () => {
    const user = userEvent.setup();
    const post = { ...genericPost, author: genericCurrentUser };

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
                        <PostHeader post={post} />
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>,
    );

    const threeDotsButton = await screen.findByRole('button');

    expect(screen.queryByTestId('PostActionMenu')).not.toBeInTheDocument();

    await user.click(threeDotsButton);

    expect(screen.getByTestId('PostActionMenu')).toBeVisible();
});
