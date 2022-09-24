import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { genericComment, genericPost } from '../../mocks/handlers';
import { server } from '../../setupTests';
import CommentDeletePopup from '../CommentDeletePopup';

test('should call delete comment endpoint on confirm', async () => {
    const user = userEvent.setup();
    const fn = jest.fn();
    const post = { ...genericPost };
    const comment = { ...genericComment };

    server.use(
        rest.delete<
            Record<string, never>,
            { postId: string; commentId: string }
        >('posts/:postId/comments/:commentId', (req, res, ctx) => {
            // Call mocked function with request parameters
            fn(req.params.postId, req.params.commentId);

            return res(
                ctx.json({
                    state: 'success',
                    post: { ...genericPost, _id: req.params.postId },
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
            <CommentDeletePopup
                post={post}
                comment={comment}
                hidePopup={() => ({})}
            />
        </QueryClientProvider>,
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    await user.click(deleteButton);

    await waitFor(() => expect(fn).toBeCalledWith(post._id, comment._id));
});
