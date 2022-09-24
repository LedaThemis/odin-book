import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { genericUser } from '../../mocks/handlers';
import { server } from '../../setupTests';
import GuestAccountSelect from '../GuestAccountSelect';

test('should have continue button disabled if no user is selected', async () => {
    // Default API Mock has no guest users
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <GuestAccountSelect />
        </QueryClientProvider>,
    );

    await screen.findByRole('combobox'); // If <select> is displayed means data is fetched
    const button = await screen.findByRole('button');

    expect(button).toBeDisabled();
});

test('should have select list disabled if no user is selected', async () => {
    // Default API Mock has no guest users
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    render(
        <QueryClientProvider client={queryClient}>
            <GuestAccountSelect />
        </QueryClientProvider>,
    );

    const select = await screen.findByRole('combobox');

    expect(select).toBeDisabled();
});

test('should call guest login endpoint with selected user on button click', async () => {
    const user = userEvent.setup();
    const guestUsers = [
        { ...genericUser, _id: '0' },
        { ...genericUser, _id: '1' },
        { ...genericUser, _id: '2' },
    ];
    const fn = jest.fn();

    server.use(
        rest.get('guests', (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                    users: guestUsers,
                }),
            );
        }),
        rest.post<{ id: string }>('guests', async (req, res, ctx) => {
            const body = await req.json();

            fn(body.id);

            return res(
                ctx.json({
                    state: 'success',
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
            <GuestAccountSelect />
        </QueryClientProvider>,
    );

    const select = await screen.findByRole('combobox'); // If <select> is displayed means data is fetched

    await user.selectOptions(select, guestUsers[1]._id);

    const button = await screen.findByRole('button');

    await user.click(button);

    await waitFor(() => expect(fn).toBeCalledWith(guestUsers[1]._id));
});
