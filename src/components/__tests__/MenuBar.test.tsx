import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconBase } from 'react-icons';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import MenuBar from '../MenuBar';

test('should call onClick on click if specified', async () => {
    const user = userEvent.setup();
    const text = 'Menu Bar';
    const onClick = jest.fn();

    render(
        <BrowserRouter>
            <MenuBar text={text} Icon={IconBase} onClick={onClick} />
        </BrowserRouter>,
    );

    const el = screen.getByText(text);

    await user.click(el);

    expect(onClick).toBeCalled();
});

test('should navigate to destination on click if onClick is not specified', async () => {
    const user = userEvent.setup();
    const text = 'Menu Bar';
    const destination = 'sample_destination';
    const navigate = jest.fn();
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);

    render(<MenuBar text={text} Icon={IconBase} destination={destination} />);

    const el = screen.getByText(text);

    await user.click(el);

    expect(navigate).toBeCalledWith(destination);
});
