import { IUser } from './interfaces/User';

const areSameUser = (user1: IUser, user2: IUser) => user1._id === user2._id;

export default areSameUser;
