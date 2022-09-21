import axios from '../axiosInstance';
import logout from '../logout';

jest.mock('../axiosInstance', () => ({
    post: (route: string, data: unknown) => ({
        data,
    }),
}));

test('should call axios post with correct arguments', async () => {
    const spy = jest.spyOn(axios, 'post');

    await logout();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('logout');
});
