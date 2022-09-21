import areSameUser from '../areSameUser';
import { IAnyUser } from '../interfaces/User';

test('works if id is the same', () => {
    const user1 = { _id: '1' } as IAnyUser;
    const user2 = { _id: '1' } as IAnyUser;

    expect(areSameUser(user1, user2)).toBe(true);
});

test('works if ids are different', () => {
    const user1 = { _id: '1' } as IAnyUser;
    const user2 = { _id: '2' } as IAnyUser;

    expect(areSameUser(user1, user2)).toBe(false);
});
