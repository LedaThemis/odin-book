import axios from '../axiosInstance';
import friendUser from '../friendUser';

jest.mock('../axiosInstance', () => ({
    post: (route: string, data: unknown) => ({
        data: {
            user: data,
        },
    }),
}));

test('should call axios post with correct arguments', async () => {
    const userId = '1';

    const spy = jest.spyOn(axios, 'post');

    await friendUser({ userId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`users/${userId}/friend`);
});
