import axios from '../axiosInstance';
import loginGuest from '../loginGuest';

jest.mock('../axiosInstance', () => ({
    post: (route: string, data: unknown) => ({
        data: {
            post: data,
        },
    }),
}));

test('should call axios post with correct arguments', async () => {
    const userId = '1';
    const spy = jest.spyOn(axios, 'post');

    await loginGuest({ userId });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('guests', { id: userId });
});
