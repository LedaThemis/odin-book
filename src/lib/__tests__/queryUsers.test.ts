import axios from '../axiosInstance';
import queryUsers from '../queryUsers';

jest.mock('../axiosInstance', () => ({
    get: (route: string, data: unknown) => ({
        data: {
            users: data,
        },
    }),
}));

test('should call axios get with correct arguments', async () => {
    const queryString = '1';
    const spy = jest.spyOn(axios, 'get');

    await queryUsers({ q: queryString });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`users/search?q=${queryString}`);
});
