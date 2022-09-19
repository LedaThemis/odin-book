import { IAnyUser } from './interfaces/User';

const areFriends = (user1: IAnyUser, user2: IAnyUser) =>
    user1.friends.some((x) =>
        typeof x === 'string' ? x === user2._id : x._id === user2._id,
    );
export default areFriends;
