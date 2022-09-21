import getUserURL from '../getUserURL';
import { IAnyUser } from '../interfaces/User';

test('should return correct user url', () => {
    const user1Id = '1';
    const user = {
        _id: user1Id,
    } as IAnyUser;

    expect(getUserURL(user)).toBe(`/users/${user1Id}`);
});
