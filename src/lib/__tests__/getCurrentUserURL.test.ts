import getCurrentUserURL from '../getCurrentUserURL';

const userid = 'someuserid';

jest.mock('../../context/UserProvider', () => ({
    useCurrentUser: () => ({
        _id: userid,
    }),
}));
test('should return correct user url', () => {
    expect(getCurrentUserURL()).toBe(`/users/${userid}`);
});
