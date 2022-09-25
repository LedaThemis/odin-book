import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PostActionMenu from '../PostActionMenu';

test('should call handleEditPost on edit button click', async () => {
    const user = userEvent.setup();
    const handleEditPost = jest.fn();

    render(
        <PostActionMenu
            handleEditPost={handleEditPost}
            handleDeletePost={() => ({})}
        />,
    );

    const el = screen.getByText('Edit post');

    await user.click(el);

    expect(handleEditPost).toBeCalled();
});

test('should call handleDeletePost on delete button click', async () => {
    const user = userEvent.setup();
    const handleDeletePost = jest.fn();

    render(
        <PostActionMenu
            handleEditPost={() => ({})}
            handleDeletePost={handleDeletePost}
        />,
    );

    const el = screen.getByText('Move to trash');

    await user.click(el);

    expect(handleDeletePost).toBeCalled();
});

test('should not call handleEditPost on delete button click', async () => {
    const user = userEvent.setup();

    const handleEditPost = jest.fn();
    const handleDeletePost = jest.fn();

    render(
        <PostActionMenu
            handleEditPost={handleEditPost}
            handleDeletePost={handleDeletePost}
        />,
    );

    const el = screen.getByText('Move to trash');

    await user.click(el);

    expect(handleEditPost).not.toBeCalled();
});

test('should not call handleDeletePost on edit button click', async () => {
    const user = userEvent.setup();

    const handleEditPost = jest.fn();
    const handleDeletePost = jest.fn();

    render(
        <PostActionMenu
            handleEditPost={handleEditPost}
            handleDeletePost={handleDeletePost}
        />,
    );

    const el = screen.getByText('Edit post');

    await user.click(el);

    expect(handleDeletePost).not.toBeCalled();
});
