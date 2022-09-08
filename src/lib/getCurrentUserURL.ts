import { useUser } from '../context/UserProvider';

const getCurrentUserURL = () => {
    const user = useUser();

    return `/users/${user?._id}`;
};

export default getCurrentUserURL;
