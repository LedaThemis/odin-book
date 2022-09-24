import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '../../context/AuthProvider';
import { UserProvider } from '../../context/UserProvider';
import { genericChatRoom, genericUser } from '../../mocks/handlers';
import ChatBar from '../ChatBar';
import { queryClient } from './utils';

test('should render with member username', async () => {
    const room = {
        ...genericChatRoom,
        members: [{ ...genericUser, _id: '1' }], // id should be different than current user
    };

    render(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <UserProvider>
                    <BrowserRouter>
                        <ChatBar room={room} />
                    </BrowserRouter>
                </UserProvider>
            </AuthProvider>
        </QueryClientProvider>,
    );

    expect(await screen.findByText(genericUser.displayName)).toBeVisible();
});

test('should render image with member photoURL', async () => {
    const photoURL = 'http://example.com/';

    const room = {
        ...genericChatRoom,
        members: [{ ...genericUser, _id: '1', photoURL }], // id should be different than current user
    };

    render(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <UserProvider>
                    <BrowserRouter>
                        <ChatBar room={room} />
                    </BrowserRouter>
                </UserProvider>
            </AuthProvider>
        </QueryClientProvider>,
    );

    const img: HTMLImageElement = await screen.findByRole('img');

    expect(img).toBeVisible();
    expect(img.src).toBe(photoURL);
});
