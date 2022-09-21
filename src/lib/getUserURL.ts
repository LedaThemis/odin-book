import { IAnyUser } from './interfaces/User';

const getUserURL = (user: IAnyUser) => {
    return `/users/${user._id}`;
};

export default getUserURL;
