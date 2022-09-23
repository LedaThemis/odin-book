import { rest } from 'msw';

import { server } from '../../setupTests';
import getCurrentUser from '../getCurrentUser';

test('should return current user if exist', async () => {
    const response = await getCurrentUser();

    // defined in handlers.ts
    expect(response).toMatchObject({
        displayName: 'Current User',
    });
});

test('should return null if current user does not exist', async () => {
    server.use(
        rest.get('me', (req, res, ctx) => {
            return res(
                ctx.json({
                    user: undefined,
                }),
            );
        }),
    );

    const response = await getCurrentUser();

    expect(response).toBe(null);
});
