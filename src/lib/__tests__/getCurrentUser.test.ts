import axios from '../axiosInstance';
import getCurrentUser from '../getCurrentUser';

jest.mock('../axiosInstance', () => ({
    get: (route: string, data: unknown) => ({
        data: {
            user: data,
        },
    }),
}));

test('should call axios get with correct arguments', async () => {
    const spy = jest.spyOn(axios, 'get');

    await getCurrentUser();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('me');
});
