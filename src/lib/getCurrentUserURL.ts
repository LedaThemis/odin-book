import { useUser } from '../context/UserProvider';
import getUserURL from './getUserURL';
import { IUser } from './interfaces/User';

const getCurrentUserURL = () => {
    const user = useUser() as IUser;

    return getUserURL(user);
};

export default getCurrentUserURL;
