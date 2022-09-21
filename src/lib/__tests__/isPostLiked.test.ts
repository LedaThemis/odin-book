import { IPost } from '../interfaces/Post';
import { IAnyUser } from '../interfaces/User';
import isPostLiked from '../isPostLiked';

test('should return true if user id is in likes list', () => {
    const userId = '1';
    const user = {
        _id: userId,
    } as IAnyUser;

    const post = {
        likes: [userId],
    } as IPost;

    expect(isPostLiked(post, user)).toBe(true);
});

test('should return false if user id is not in likes list', () => {
    const userId = '1';
    const user = {
        _id: userId,
    } as IAnyUser;

    const post = {
        likes: ['somerandomuser'],
    } as IPost;

    expect(isPostLiked(post, user)).toBe(false);
});
