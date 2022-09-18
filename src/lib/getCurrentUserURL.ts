import { useCurrentUser } from '../context/UserProvider';
import getUserURL from './getUserURL';
import { IUser } from './interfaces/User';

const getCurrentUserURL = () => {
    const user = useCurrentUser() as IUser;

    return getUserURL(user);
};

export default getCurrentUserURL;
