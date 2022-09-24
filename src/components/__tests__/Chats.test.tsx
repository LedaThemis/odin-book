import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';

import { genericChatRoom, genericUser } from '../../mocks/handlers';
import { server } from '../../setupTests';
import Chats from '../Chats';

// eslint-disable-next-line react/display-name
jest.mock('../ChatBar', () => () => <div data-testid="ChatBar"></div>);

test('should render info text if there is no conversations', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    // Default API Mock is to have no conversations
    render(
        <QueryClientProvider client={queryClient}>
            <Chats />
        </QueryClientProvider>,
    );

    expect(await screen.findByText(/started any conversation yet./));
});

test('should render ChatBar if there is conversations', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    const room = {
        ...genericChatRoom,
        members: [genericUser],
    };

    const conversations = [room, { ...room, _id: '1' }, { ...room, _id: '2' }];

    server.use(
        rest.get('chat/conversations', (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                    conversations,
                }),
            );
        }),
    );

    render(
        <QueryClientProvider client={queryClient}>
            <Chats />
        </QueryClientProvider>,
    );

    const ChatBars = await screen.findAllByTestId('ChatBar');

    expect(ChatBars.length).toBe(conversations.length);
});
