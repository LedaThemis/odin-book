import axios from './axiosInstance';

interface ILoginGuest {
    userId: string;
}

const loginGuest = async ({ userId }: ILoginGuest) => {
    await axios.post('guests', { id: userId });
};

export default loginGuest;
