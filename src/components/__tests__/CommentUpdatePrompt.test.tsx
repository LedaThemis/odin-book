import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { genericComment } from '../../mocks/handlers';
import { server } from '../../setupTests';
import CommentUpdatePrompt from '../CommentUpdatePrompt';

test('should set initial form input value from comment', async () => {
    const comment = { ...genericComment };

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <CommentUpdatePrompt comment={comment} cancelEditing={() => ({})} />
        </QueryClientProvider>,
    );

    const input: HTMLInputElement = await screen.findByRole('textbox');

    expect(input.value).toBe(comment.content);
});

test('should update form input value on type', async () => {
    const user = userEvent.setup();
    const comment = { ...genericComment };
    const text = 'Text content!';

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <CommentUpdatePrompt comment={comment} cancelEditing={() => ({})} />
        </QueryClientProvider>,
    );

    const input: HTMLInputElement = await screen.findByRole('textbox');

    await user.clear(input);

    await user.type(input, text);

    expect(input.value).toBe(text);
});

test('should call update comment endpoint on submit', async () => {
    const user = userEvent.setup();
    const comment = { ...genericComment };
    const text = 'New comment content!';
    const fn = jest.fn();

    server.use(
        rest.post<{ content: string }, { commentId: string }>(
            'comments/:commentId',
            async (req, res, ctx) => {
                const body = await req.json();

                fn(req.params.commentId, body.content);

                return res(
                    ctx.json({
                        state: 'success',
                        comment: {
                            ...genericComment,
                            _id: req.params.commentId,
                            content: body.content,
                        },
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
            <CommentUpdatePrompt comment={comment} cancelEditing={() => ({})} />
        </QueryClientProvider>,
    );

    const input: HTMLInputElement = await screen.findByRole('textbox');

    await user.clear(input);

    await user.type(input, text);

    await user.type(input, '{Enter}');

    await waitFor(() => expect(fn).toBeCalledWith(comment._id, text));
});

test('should not call update comment endpoint on submit if content is empty', async () => {
    const user = userEvent.setup();
    const comment = { ...genericComment };
    const fn = jest.fn();

    server.use(
        rest.post<{ content: string }, { commentId: string }>(
            'comments/:commentId',
            async (req, res, ctx) => {
                const body = await req.json();

                fn(req.params.commentId, body.content);

                return res(
                    ctx.json({
                        state: 'success',
                        comment: {
                            ...genericComment,
                            _id: req.params.commentId,
                            content: body.content,
                        },
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
            <CommentUpdatePrompt comment={comment} cancelEditing={() => ({})} />
        </QueryClientProvider>,
    );

    const input: HTMLInputElement = await screen.findByRole('textbox');

    await user.clear(input);

    await user.type(input, '{Enter}');

    await waitFor(() => expect(fn).not.toBeCalled());
});

test('should call cancelEditing on submit', async () => {
    const user = userEvent.setup();
    const comment = { ...genericComment };
    const cancelEditing = jest.fn();

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <CommentUpdatePrompt
                comment={comment}
                cancelEditing={cancelEditing}
            />
        </QueryClientProvider>,
    );

    const input: HTMLInputElement = await screen.findByRole('textbox');

    await user.type(input, '{Enter}');

    expect(cancelEditing).toBeCalled();
});

test('should call cancelEditing on cancel click', async () => {
    const user = userEvent.setup();
    const comment = { ...genericComment };
    const cancelEditing = jest.fn();

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <CommentUpdatePrompt
                comment={comment}
                cancelEditing={cancelEditing}
            />
        </QueryClientProvider>,
    );

    const el = await screen.findByText('Cancel');

    await user.click(el);

    expect(cancelEditing).toBeCalled();
});
