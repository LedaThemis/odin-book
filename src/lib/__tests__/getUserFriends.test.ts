import axios from '../axiosInstance';
import getUserFriends from '../getUserFriends';

jest.mock('../axiosInstance', () => ({
    get: (route: string, data: unknown) => ({
        data: {
            users: data,
        },
    }),
}));

test('should call axios get with correct arguments', async () => {
    const userId = '1';
    const spy = jest.spyOn(axios, 'get');

    await getUserFriends({ userId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`users/${userId}/friends`);
});
