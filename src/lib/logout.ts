import axios from './axiosInstance';

const logout = async () => {
    await axios.post('logout');
};

export default logout;
