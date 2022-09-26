import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PostImageInputBar from '../PostImageInputBar';

test('should call handleImageInputRemove on button click', async () => {
    const user = userEvent.setup();
    const handleImageInputRemove = jest.fn();

    render(
        <PostImageInputBar
            currentValue=""
            handleImageInputChange={() => ({})}
            handleImageInputRemove={handleImageInputRemove}
        />,
    );

    const button = screen.getByRole('button');

    expect(handleImageInputRemove).not.toBeCalled();

    await user.click(button);

    expect(handleImageInputRemove).toBeCalled();
});

test('should call handleImageInputChange on button click', async () => {
    const user = userEvent.setup();
    const handleImageInputChange = jest.fn();

    render(
        <PostImageInputBar
            currentValue=""
            handleImageInputChange={handleImageInputChange}
            handleImageInputRemove={() => ({})}
        />,
    );

    const input = screen.getByRole('textbox');

    expect(handleImageInputChange).not.toBeCalled();

    await user.type(input, 'Random Text');

    expect(handleImageInputChange).toBeCalled();
});
