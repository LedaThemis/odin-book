import { render, screen } from '@testing-library/react';

import LoginForm from '../LoginForm';

// eslint-disable-next-line react/display-name
jest.mock('../buttons/GoogleSignInButton', () => () => (
    <div data-testid="GoogleSignInButton" />
));

// eslint-disable-next-line react/display-name
jest.mock('../GuestAccountSelect', () => () => (
    <div data-testid="GuestAccountSelect" />
));

test('should render GoogleSignInButton', () => {
    render(<LoginForm />);

    expect(screen.getByTestId('GoogleSignInButton')).toBeVisible();
});

test('should render GuestAccountSelect', () => {
    render(<LoginForm />);

    expect(screen.getByTestId('GuestAccountSelect')).toBeVisible();
});

test('should render description for guest accounts', () => {
    render(<LoginForm />);

    expect(
        screen.getByText('Or use one of the available guest accounts', {
            exact: false,
        }),
    );
});
