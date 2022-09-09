import { IUser } from './interfaces/User';

const getUserURL = (user: IUser) => {
    return `/users/${user._id}`;
};

export default getUserURL;
