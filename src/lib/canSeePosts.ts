import areFriends from './areFriends';
import areSameUser from './areSameUser';
import { IAnyUser, IPopulatedUser } from './interfaces/User';

const canSeePosts = (user1: IPopulatedUser, user2: IAnyUser) =>
    areFriends(user1, user2) || areSameUser(user1, user2);

export default canSeePosts;
