import axios from '../axiosInstance';
import updateUser from '../updateUser';

jest.mock('../axiosInstance', () => ({
    post: (route: string, data: unknown) => ({
        data: {
            user: data,
        },
    }),
}));

test('should call axios post with correct arguments', async () => {
    const photoURL = 'new photo url';

    const spy = jest.spyOn(axios, 'post');

    await updateUser({ photoURL });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('me', {
        photoURL,
    });
});
