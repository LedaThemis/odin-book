import axios from '../axiosInstance';
import getGuestUsers from '../getGuestUsers';

jest.mock('../axiosInstance', () => ({
    get: (route: string, data: unknown) => ({
        data: {
            users: data,
        },
    }),
}));

test('should call axios get with correct arguments', async () => {
    const spy = jest.spyOn(axios, 'get');

    await getGuestUsers();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('guests');
});
