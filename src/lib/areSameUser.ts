import { IAnyUser } from './interfaces/User';

const areSameUser = (user1: IAnyUser, user2: IAnyUser) =>
    user1._id === user2._id;

export default areSameUser;
