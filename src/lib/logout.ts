import axios from './axiosInstance';

const logout = async () => {
    await axios.post('logout', {}, { withCredentials: true });
};

export default logout;
