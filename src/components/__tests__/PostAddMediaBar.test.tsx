import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PostAddMediaBar from '../PostAddMediaBar';

test('should call handleImageAddClick on button click', async () => {
    const user = userEvent.setup();
    const handleImageAddClick = jest.fn();

    render(<PostAddMediaBar handleImageAddClick={handleImageAddClick} />);

    const button = screen.getByRole('button');

    await user.click(button);

    expect(handleImageAddClick).toBeCalled();
});

test('should not call handleImageAddClick on render', () => {
    const handleImageAddClick = jest.fn();

    render(<PostAddMediaBar handleImageAddClick={handleImageAddClick} />);

    expect(handleImageAddClick).not.toBeCalled();
});
