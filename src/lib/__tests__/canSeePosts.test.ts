import canSeePosts from '../canSeePosts';
import { IAnyUser } from '../interfaces/User';

test('works if same user', () => {
    const user = { _id: '1', friends: ['somerandomid'] } as IAnyUser;

    expect(canSeePosts(user, user)).toBe(true);
});

test('works if user are friends (user as object in friends)', () => {
    const user1 = { _id: '1' } as IAnyUser;

    const user2 = { _id: '2', friends: [user1] } as IAnyUser;

    expect(canSeePosts(user2, user1)).toBe(true);
});

test('works if user are friends (user as string in friends)', () => {
    const user1Id = '1';
    const user1 = { _id: user1Id } as IAnyUser;

    const user2 = { _id: '2', friends: [user1Id] } as IAnyUser;

    expect(canSeePosts(user2, user1)).toBe(true);
});

test('works if users are neither friends nor the same user', () => {
    const user1 = { _id: '1', friends: ['randomId1'] } as IAnyUser;
    const user2 = { _id: '2', friends: ['randomId2'] } as IAnyUser;

    expect(canSeePosts(user1, user2)).toBe(false);
});
