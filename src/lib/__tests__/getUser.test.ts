import axios from '../axiosInstance';
import getUser from '../getUser';

jest.mock('../axiosInstance', () => ({
    get: (route: string, data: unknown) => ({
        data: {
            user: data,
        },
    }),
}));

test('should call axios get with correct arguments', async () => {
    const userId = '1';
    const spy = jest.spyOn(axios, 'get');

    await getUser({ userId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`users/${userId}`);
});
