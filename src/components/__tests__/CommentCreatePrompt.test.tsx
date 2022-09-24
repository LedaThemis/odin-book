import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { AuthProvider } from '../../context/AuthProvider';
import { UserProvider } from '../../context/UserProvider';
import { genericPost } from '../../mocks/handlers';
import { server } from '../../setupTests';
import CommentCreatePrompt from '../CommentCreatePrompt';

test('should update form input on type', async () => {
    const user = userEvent.setup();

    const text = 'Text that user will type';

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <UserProvider>
                    <CommentCreatePrompt post={genericPost} />
                </UserProvider>
            </AuthProvider>
        </QueryClientProvider>,
    );

    const input: HTMLInputElement = await screen.findByRole('textbox');

    await user.type(input, text);

    expect(input.value).toBe(text);
});

test('should call comment post endpoint on submit', async () => {
    const user = userEvent.setup();

    const fn = jest.fn();

    const post = { ...genericPost };

    const text = 'Text that user will type';

    server.use(
        rest.post<{ content: string }>(
            `posts/:postId/comments`,
            async (req, res, ctx) => {
                const body = await req.json();

                // Call mocked function with submitted content
                fn(body.content);

                return res(
                    ctx.json({
                        state: 'success',
                        post,
                    }),
                );
            },
        ),
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
            <AuthProvider>
                <UserProvider>
                    <CommentCreatePrompt post={post} />
                </UserProvider>
            </AuthProvider>
        </QueryClientProvider>,
    );

    const input: HTMLInputElement = await screen.findByRole('textbox');

    await user.type(input, text);

    await user.click(input);

    await user.keyboard('{Enter}');

    await waitFor(() => expect(fn).toBeCalledWith(text));
});

test('should not call comment post endpoint if content is empty', async () => {
    const user = userEvent.setup();

    const fn = jest.fn();

    const post = { ...genericPost };

    server.use(
        rest.post<{ content: string }>(
            `posts/:postId/comments`,
            async (req, res, ctx) => {
                const body = await req.json();

                // Call mocked function with submitted content
                fn(body.content);

                return res(
                    ctx.json({
                        state: 'success',
                        post,
                    }),
                );
            },
        ),
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
            <AuthProvider>
                <UserProvider>
                    <CommentCreatePrompt post={post} />
                </UserProvider>
            </AuthProvider>
        </QueryClientProvider>,
    );

    const input: HTMLInputElement = await screen.findByRole('textbox');

    await user.click(input);

    await user.keyboard('{Enter}');

    await waitFor(() => expect(fn).not.toHaveBeenCalled());
});

test('should clear form input value on submit', async () => {
    const user = userEvent.setup();

    const text = 'Text that user will type';

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <UserProvider>
                    <CommentCreatePrompt post={genericPost} />
                </UserProvider>
            </AuthProvider>
        </QueryClientProvider>,
    );

    const input: HTMLInputElement = await screen.findByRole('textbox');

    await user.type(input, text);

    await user.click(input);

    await user.keyboard('{Enter}');

    await waitFor(() => expect(input.value).toBe(''));
});
