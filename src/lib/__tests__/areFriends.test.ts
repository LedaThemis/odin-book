import areFriends from '../areFriends';
import { IAnyUser } from '../interfaces/User';

test('works with user in friends as string', () => {
    const user1Id = '1';
    const user1 = { _id: user1Id } as IAnyUser;
    const user2 = { _id: '2', friends: [user1Id] } as IAnyUser;

    expect(areFriends(user2, user1)).toBe(true);
});

test('works with user in friends as object', () => {
    const user1 = { _id: '1' } as IAnyUser;
    const user2 = { _id: '2', friends: [user1] } as IAnyUser;

    expect(areFriends(user2, user1)).toBe(true);
});

test('works with user not in friends', () => {
    const user1 = { _id: '1' } as IAnyUser;
    const user2 = {
        _id: '2',
        friends: ['randomId', { _id: 'randomIdInObject' }],
    } as IAnyUser;

    expect(areFriends(user2, user1)).toBe(false);
});
