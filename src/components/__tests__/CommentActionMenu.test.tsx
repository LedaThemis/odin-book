import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CommentActionMenu from '../CommentActionMenu';

test('should show edit bar if showEdit is true', async () => {
    render(
        <CommentActionMenu
            showEdit={true}
            handleDeleteComment={() => ({})}
            handleEditComment={() => ({})}
        />,
    );

    expect(await screen.findByText(/Edit/)).toBeVisible();
});

test('should not show edit bar if showEdit is false', async () => {
    render(
        <CommentActionMenu
            showEdit={false}
            handleDeleteComment={() => ({})}
            handleEditComment={() => ({})}
        />,
    );

    expect(screen.queryByText(/Edit/)).not.toBeInTheDocument();
});

test('should call handleEditComment on Edit bar click', async () => {
    const user = userEvent.setup();
    const handleEditComment = jest.fn();

    render(
        <CommentActionMenu
            showEdit={true}
            handleEditComment={handleEditComment}
            handleDeleteComment={() => ({})}
        />,
    );

    const bar = screen.getByText(/Edit/);

    await user.click(bar);

    expect(handleEditComment).toBeCalled();
});

test('should call handleDeleteComment on Edit bar click', async () => {
    const user = userEvent.setup();
    const handleDeleteComment = jest.fn();

    render(
        <CommentActionMenu
            showEdit={true}
            handleEditComment={() => ({})}
            handleDeleteComment={handleDeleteComment}
        />,
    );

    const bar = screen.getByText(/Delete/);

    await user.click(bar);

    expect(handleDeleteComment).toBeCalled();
});
