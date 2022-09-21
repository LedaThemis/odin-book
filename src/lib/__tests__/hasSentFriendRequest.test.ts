import hasSentFriendRequest from '../hasSentFriendRequest';
import { IAnyUser } from '../interfaces/User';

test('should return true if sender is in incomingFriendRequests of recipient', () => {
    const senderId = '1';
    const sender = {
        _id: senderId,
    } as IAnyUser;

    const recipient = {
        _id: '2',
        incomingFriendRequests: [senderId],
    } as IAnyUser;

    expect(hasSentFriendRequest(recipient, sender)).toBe(true);
});

test('should return false if sender is not in incomingFriendRequests of recipient', () => {
    const senderId = '1';
    const sender = {
        _id: senderId,
    } as IAnyUser;

    const recipient = {
        _id: '2',
        incomingFriendRequests: ['randomUserId'],
    } as IAnyUser;

    expect(hasSentFriendRequest(recipient, sender)).toBe(false);
});
