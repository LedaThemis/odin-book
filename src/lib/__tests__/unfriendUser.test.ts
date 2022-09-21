import axios from '../axiosInstance';
import unfriendUser from '../unfriendUser';

jest.mock('../axiosInstance', () => ({
    delete: (route: string, data: unknown) => ({
        data: {
            user: data,
        },
    }),
}));

test('should call axios delete with correct arguments', async () => {
    const userId = '1';

    const spy = jest.spyOn(axios, 'delete');

    await unfriendUser({ userId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`users/${userId}/friend`);
});
