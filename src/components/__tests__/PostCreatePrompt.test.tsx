import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '../../context/AuthProvider';
import { UserProvider } from '../../context/UserProvider';
import { genericCurrentUser } from '../../mocks/handlers';
import { server } from '../../setupTests';
import PostCreatePrompt from '../PostCreatePrompt';

// eslint-disable-next-line react/display-name
jest.mock('../PostCreatePopup', () => () => (
    <div data-testid="PostCreatePopup"></div>
));

test('should show PostCreatePopup on button click', async () => {
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
                        <PostCreatePrompt />
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>,
    );

    const button = await screen.findByRole('button');

    expect(screen.queryByTestId('PostCreatePopup')).not.toBeInTheDocument();

    await user.click(button);

    expect(screen.getByTestId('PostCreatePopup')).toBeVisible();
});

test('should render current user display name', async () => {
    const displayName = 'Random User';
    const currentUser = { ...genericCurrentUser, displayName };

    server.use(
        rest.get('me', (req, res, ctx) => {
            return res(
                ctx.json({
                    user: currentUser,
                }),
            );
        }),
    );

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
                        <PostCreatePrompt />
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>,
    );

    expect(
        await screen.findByText(displayName, { exact: false }),
    ).toBeVisible();
});
