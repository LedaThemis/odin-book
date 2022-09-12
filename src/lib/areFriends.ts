import { IAnyUser, IPopulatedUser } from './interfaces/User';

const areFriends = (user1: IPopulatedUser, user2: IAnyUser) =>
    user1.friends.some((u) => u._id === user2._id);

export default areFriends;
